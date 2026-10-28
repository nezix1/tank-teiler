// TankTeiler - Backend (Node.js + Express + SQLite)
require('dotenv').config();
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(express.json());

const publicDir = path.join(__dirname, 'public');
app.get('/presentation.html', (req, res) => res.redirect(301, '/presentation'));
app.get('/presentation', (req, res) => res.sendFile(path.join(publicDir, 'presentation.html')));
app.get('/speech', (req, res) => res.download(path.join(publicDir, 'Praesentation-Redetext-DE-RU.txt')));
app.use(express.static(publicDir));

// ---------- 1. Datenbank: Autos (SQLite = eine Datei) ----------
const db = new Database(path.join(__dirname, 'tankteiler.db'));
db.exec(`CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  seats INTEGER NOT NULL,
  consumption REAL NOT NULL,      -- Liter pro 100 km
  fuel TEXT NOT NULL CHECK (fuel IN ('95','98','diesel'))
)`);

if (db.prepare('SELECT COUNT(*) AS c FROM cars').get().c === 0) {
  const ins = db.prepare('INSERT INTO cars (name, seats, consumption, fuel) VALUES (?,?,?,?)');
  [
    ['VW Golf 1.5 TSI', 5, 5.8, '95'],
    ['Skoda Octavia 2.0 TDI', 5, 4.9, 'diesel'],
    ['Toyota Yaris 1.5', 5, 4.8, '95'],
    ['Fiat 500', 4, 5.2, '95'],
    ['Opel Corsa 1.2', 5, 5.5, '95'],
    ['BMW 320d', 5, 4.8, 'diesel'],
    ['VW Touran 2.0 TDI', 7, 5.6, 'diesel'],
    ['Porsche 911 Carrera', 4, 9.5, '98'],
  ].forEach(c => ins.run(...c));
}

// Eingaben pruefen (nie dem Client vertrauen)
function parseCar(b) {
  const name = String(b.name || '').trim().slice(0, 60);
  const seats = Math.round(Number(b.seats));
  const consumption = Number(b.consumption);
  const fuel = b.fuel;
  const ok = name && seats >= 1 && seats <= 9 && consumption > 0 && consumption <= 40
    && ['95', '98', 'diesel'].includes(fuel);
  return ok ? { name, seats, consumption, fuel } : null;
}

// ---------- 2. REST-API fuer Autos (CRUD) ----------
app.get('/api/cars', (req, res) => {
  res.json(db.prepare('SELECT * FROM cars ORDER BY name').all());
});

app.post('/api/cars', (req, res) => {
  const c = parseCar(req.body);
  if (!c) return res.status(400).json({ error: 'Ungültige Daten' });
  const r = db.prepare('INSERT INTO cars (name, seats, consumption, fuel) VALUES (?,?,?,?)')
    .run(c.name, c.seats, c.consumption, c.fuel);
  res.status(201).json({ id: r.lastInsertRowid, ...c });
});

app.put('/api/cars/:id', (req, res) => {
  const c = parseCar(req.body);
  if (!c) return res.status(400).json({ error: 'Ungültige Daten' });
  const r = db.prepare('UPDATE cars SET name=?, seats=?, consumption=?, fuel=? WHERE id=?')
    .run(c.name, c.seats, c.consumption, c.fuel, req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json({ id: Number(req.params.id), ...c });
});

app.delete('/api/cars/:id', (req, res) => {
  db.prepare('DELETE FROM cars WHERE id=?').run(req.params.id);
  res.status(204).end();
});

// ---------- 3. Benzinpreise von TCS holen (Web-Scraping) ----------
const TCS_URL = 'https://www.tcs.ch/de/camping-reisen/reiseinformationen/wissenswertes/fahrkosten-gebuehren/benzinpreise.php';
const FALLBACK = { '95': 2.13, '98': 2.24, diesel: 2.42, since: '23.10.2026', source: 'fallback' };
const CACHE_MS = 3 * 60 * 60 * 1000; // 3 Stunden
let cache = null;

async function fetchPrices() {
  const html = await (await fetch(TCS_URL, { headers: { 'User-Agent': 'Mozilla/5.0 TankTeiler' } })).text();
  // HTML -> reiner Text
  const text = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  // Zeile der Schweiz: "Schweiz 2.13 2.24 2.42"  (95, 98, Diesel)
  const m = text.match(/Schweiz\s+(\d\.\d{2,3})\s+(\d\.\d{2,3})\s+(\d\.\d{2,3})/);
  if (!m) throw new Error('Preise nicht gefunden');
  const d = text.match(/Unverändert gültig seit:?\s*(\d{2}\.\d{2}\.\d{4})/);
  return { '95': +m[1], '98': +m[2], diesel: +m[3], since: d ? d[1] : null, source: 'tcs' };
}

app.get('/api/prices', async (req, res) => {
  if (cache && Date.now() - cache.at < CACHE_MS) return res.json(cache.data);
  try {
    const data = await fetchPrices();
    cache = { at: Date.now(), data };
    res.json(data);
  } catch (e) {
    console.warn('TCS-Abruf fehlgeschlagen:', e.message);
    res.json(cache ? cache.data : FALLBACK); // letzter Stand, sonst Fallback
  }
});

// ---------- 4. Konfiguration fuer das Frontend ----------
app.get('/api/config', (req, res) => {
  res.json({
    mapsKey: process.env.GOOGLE_MAPS_API_KEY || '',
    mapId: process.env.GOOGLE_MAPS_MAP_ID || '',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TankTeiler läuft auf http://localhost:${PORT}`));
