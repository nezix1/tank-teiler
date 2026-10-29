// TankTeiler - Backend (Node.js + Express)
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const publicDir = path.join(__dirname, 'public');
app.get('/presentation.html', (req, res) => res.redirect(301, '/presentation'));
app.get('/presentation', (req, res) => res.sendFile(path.join(publicDir, 'presentation.html')));
app.get('/speech', (req, res) => res.download(path.join(publicDir, 'Vortragstext-DE.txt')));
app.get('/api-guide', (req, res) => res.download(path.join(publicDir, 'API-Erklaerung-RU.txt')));
app.use(express.static(publicDir));

// ---------- Benzinpreise von TCS holen (Web-Scraping) ----------
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

// ---------- Konfiguration fuer das Frontend ----------
app.get('/api/config', (req, res) => {
  res.json({
    mapsKey: process.env.GOOGLE_MAPS_API_KEY || '',
    mapId: process.env.GOOGLE_MAPS_MAP_ID || '',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TankTeiler läuft auf http://localhost:${PORT}`));
