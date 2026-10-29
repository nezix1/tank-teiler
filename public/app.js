// TankTeiler - Frontend (reines JavaScript, keine Frameworks)

// ---------- Übersetzungen ----------
const T = {
  de: { tagline: 'Fahrtkosten berechnen und gerecht aufteilen.', presentation: 'Präsentation', route: 'Route', searchA: 'Start suchen oder auf Karte klicken', searchB: 'Ziel suchen oder auf Karte klicken',
    hint: 'Tipp: Klick auf die Karte setzt zuerst A, dann B. Für Stopps erst ein Feld auswählen. Pins lassen sich verschieben.', swap: 'A ⇄ B tauschen', reset: 'Zurücksetzen',
    addStop: '+ Stopp hinzufügen', stop: 'Stopp', stopPlaceholder: 'Zwischenstopp suchen oder Karte auswählen', removeStop: 'Stopp entfernen', moveUp: 'Nach oben', moveDown: 'Nach unten', completeStops: 'Bitte wähle für jeden Zwischenstopp einen Ort aus.', stopLimit: 'Maximal 25 Zwischenstopps sind möglich.',
    car: 'Auto', noCars: 'Noch kein Auto gespeichert. Gib unten die Fahrzeugdaten ein und wähle „Auto hinzufügen“.', carStorage: 'Deine Autos werden nur in diesem Browser gespeichert.', selectCar: 'Auto auswählen', carNamePlaceholder: 'z. B. Mein Auto', addCar: 'Auto hinzufügen', name: 'Name', seats: 'Sitzplätze', cons: 'Verbrauch (L/100 km)', fuel: 'Treibstoff', save: 'Speichern', saveNew: 'Als neues Auto', del: 'Löschen',
    options: 'Fahrt', distance: 'Distanz (km)', pax: 'Personen', price: 'Preis (CHF/L)', parking: 'Parkkosten (CHF)', roadFees: 'Maut (CHF)', tripFeesHint: 'Parken und Maut gelten für die ganze Fahrt. Bei Hin- und Rückfahrt wird nur der Treibstoff verdoppelt.', fuelCost: 'Treibstoffkosten', round: 'Hin und zurück',
    perPerson: 'pro Person (aufgerundet)', total: 'Total', dist: 'Strecke', liters: 'Treibstoff', open: 'Google Maps', openApple: 'Apple Maps', appleStopsNote: 'Apple Maps öffnet Start und Ziel; Zwischenstopps sind im Google-Maps-Link enthalten.',
    loadingMap: 'Karte wird geladen …', noKey: 'Kein Google-Maps-Key gefunden. Trage ihn in die Datei .env ein (GOOGLE_MAPS_API_KEY). Die Distanz kannst du bis dahin manuell eingeben.',
    routeErr: 'Route konnte nicht berechnet werden. Prüfe Routes API und Schlüssel. {detail}', notFound: 'Ort nicht gefunden.',
    priceTcs: 'Preis von TCS, gültig seit', priceFb: 'TCS nicht erreichbar – letzter bekannter Preis vom', saved: 'Gespeichert.', deleted: 'Gelöscht.',
    requestError: 'Aktion fehlgeschlagen: {detail}' },
  en: { tagline: 'Calculate trip costs and split them fairly.', presentation: 'Presentation', route: 'Route', searchA: 'Search start or click on map', searchB: 'Search destination or click on map',
    hint: 'Tip: click the map to set A, then B. Select a stop field before choosing it on the map. Pins can be dragged.', swap: 'Swap A ⇄ B', reset: 'Reset',
    addStop: '+ Add stop', stop: 'Stop', stopPlaceholder: 'Search stop or choose on map', removeStop: 'Remove stop', moveUp: 'Move up', moveDown: 'Move down', completeStops: 'Choose a location for every stop.', stopLimit: 'You can add up to 25 stops.',
    car: 'Car', noCars: 'No car saved yet. Enter your car details below and choose “Add car”.', carStorage: 'Your cars are stored only in this browser.', selectCar: 'Select a car', carNamePlaceholder: 'e.g. My car', addCar: 'Add car', name: 'Name', seats: 'Seats', cons: 'Consumption (L/100 km)', fuel: 'Fuel', save: 'Save', saveNew: 'Save as new', del: 'Delete',
    options: 'Trip', distance: 'Distance (km)', pax: 'People', price: 'Price (CHF/L)', parking: 'Parking (CHF)', roadFees: 'Tolls (CHF)', tripFeesHint: 'Parking and tolls apply to the whole trip. A round trip doubles fuel only.', fuelCost: 'Fuel costs', round: 'Round trip',
    perPerson: 'per person (rounded up)', total: 'Total', dist: 'Distance', liters: 'Fuel', open: 'Google Maps', openApple: 'Apple Maps', appleStopsNote: 'Apple Maps opens the start and destination; stops are included in the Google Maps link.',
    loadingMap: 'Loading map …', noKey: 'No Google Maps key found. Add it to the .env file (GOOGLE_MAPS_API_KEY). Until then you can enter the distance manually.',
    routeErr: 'Route could not be calculated. Check the Routes API and API key. {detail}', notFound: 'Place not found.',
    priceTcs: 'Price from TCS, valid since', priceFb: 'TCS unreachable – last known price from', saved: 'Saved.', deleted: 'Deleted.',
    requestError: 'Action failed: {detail}' },
  ru: { tagline: 'Считай стоимость поездки и делите честно.', presentation: 'Презентация', route: 'Маршрут', searchA: 'Найти старт или клик по карте', searchB: 'Найти пункт назначения или клик по карте',
    hint: 'Подсказка: клик по карте ставит сначала A, затем B. Чтобы поставить остановку на карте, выберите её поле. Метки можно двигать.', swap: 'Поменять A ⇄ B', reset: 'Сбросить',
    addStop: '+ Добавить остановку', stop: 'Остановка', stopPlaceholder: 'Найти остановку или выбрать на карте', removeStop: 'Удалить остановку', moveUp: 'Переместить выше', moveDown: 'Переместить ниже', completeStops: 'Укажите место для каждой остановки.', stopLimit: 'Можно добавить не более 25 остановок.',
    car: 'Машина', noCars: 'Машин пока нет. Введи данные своей машины и нажми «Добавить машину».', carStorage: 'Твои машины сохраняются только в этом браузере.', selectCar: 'Выбрать машину', carNamePlaceholder: 'например, Моя машина', addCar: 'Добавить машину', name: 'Название', seats: 'Места', cons: 'Расход (л/100 км)', fuel: 'Топливо', save: 'Сохранить', saveNew: 'Как новую', del: 'Удалить',
    options: 'Поездка', distance: 'Расстояние (км)', pax: 'Людей', price: 'Цена (CHF/л)', parking: 'Парковка (CHF)', roadFees: 'Платные дороги (CHF)', tripFeesHint: 'Парковка и платные дороги указываются за всю поездку. При поездке туда и обратно удваивается только топливо.', fuelCost: 'Топливо', round: 'Туда и обратно',
    perPerson: 'с человека (округлено вверх)', total: 'Всего', dist: 'Дистанция', liters: 'Топливо', open: 'Google Maps', openApple: 'Apple Maps', appleStopsNote: 'Apple Maps откроет начало и конец маршрута; остановки есть в ссылке Google Maps.',
    loadingMap: 'Загрузка карты …', noKey: 'Ключ Google Maps не найден. Добавь его в файл .env (GOOGLE_MAPS_API_KEY). Пока можно ввести расстояние вручную.',
    routeErr: 'Не удалось построить маршрут. Проверь Routes API и API-ключ. {detail}', notFound: 'Место не найдено.',
    priceTcs: 'Цена TCS, действует с', priceFb: 'TCS недоступен – последняя известная цена от', saved: 'Сохранено.', deleted: 'Удалено.',
    requestError: 'Не удалось выполнить действие: {detail}' },
};

const $ = s => document.querySelector(s);
const state = { cars: [], prices: null, A: null, B: null, stops: [], markers: {}, lang: localStorage.getItem('lang') || 'de' };
let map, geocoder, Route, AdvancedMarkerElement, PinElement;
let routePolylines = [];
let activeTarget = null;
let nextStopId = 1;
let noticeTimer;
let notice = null;
let routeRequestId = 0;
const t = k => T[state.lang][k] || k;

function applyLang() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#lang').value = state.lang;
  updateCarControls();
  showPriceInfo();
  renderStops();
  renderNotice();
  if (!$('#mapLinksHint').hidden) $('#mapLinksHint').textContent = t('appleStopsNote');
}

function say(key, type = 'info', detail = '') {
  clearTimeout(noticeTimer);
  if (!key) {
    notice = null;
    renderNotice();
    return;
  }
  notice = { key, type, detail };
  renderNotice();
  noticeTimer = setTimeout(() => {
    notice = null;
    renderNotice();
  }, 4000);
}

function renderNotice() {
  const message = $('#msg');
  if (!message) return;
  if (!notice) {
    message.hidden = true;
    message.textContent = '';
    message.className = 'msg';
    return;
  }
  const translation = t(notice.key);
  message.textContent = translation.includes('{detail}')
    ? translation.replace('{detail}', notice.detail ? `(${notice.detail})` : '')
    : translation;
  message.className = `msg ${notice.type}`;
  message.hidden = false;
}

// ---------- API-Anfragen an den Server ----------
async function api(url, method = 'GET', body) {
  const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.status);
  return r.status === 204 ? null : r.json();
}

// ---------- Autos (lokal im Browser gespeichert) ----------
async function loadCars(selectId) {
  const savedCars = localStorage.getItem('tankteiler.cars');
  state.cars = savedCars ? JSON.parse(savedCars) : [];
  if (!Array.isArray(state.cars) || state.cars.some(car =>
    !car || !Number.isInteger(car.id) || typeof car.name !== 'string' || !car.name.trim()
    || !Number.isInteger(car.seats) || car.seats < 1 || car.seats > 9
    || !Number.isFinite(car.consumption) || car.consumption <= 0 || car.consumption > 40
    || !['95', '98', 'diesel'].includes(car.fuel))) {
    throw new Error('Stored car data is invalid.');
  }
  const select = $('#carSel');
  select.replaceChildren(new Option(t('selectCar'), '', true, true));
  state.cars.forEach(car => select.add(new Option(car.name, car.id)));
  const preferredId = selectId && state.cars.some(c => c.id == selectId) ? selectId : state.cars[0]?.id;
  select.value = preferredId || '';
  updateCarControls();
  fillEditor();
}

function updateCarControls() {
  const hasCars = state.cars.length > 0;
  $('#carHint').hidden = hasCars;
  $('#save').textContent = t(hasCars ? 'save' : 'addCar');
  $('#saveNew').hidden = !hasCars;
  $('#del').disabled = !hasCars;
}

function fillEditor() {
  const c = state.cars.find(c => c.id == $('#carSel').value);
  if (!c) {
    $('#cName').value = '';
    $('#cSeats').value = '';
    $('#cCons').value = '';
    $('#pax').value = 1;
    $('#cFuel').value = '95';
    setPriceFromFuel();
    calc();
    return;
  }
  $('#cName').value = c.name; $('#cSeats').value = c.seats; $('#cCons').value = c.consumption; $('#cFuel').value = c.fuel;
  $('#pax').value = c.seats;
  setPriceFromFuel();
  calc();
}

const carFromForm = () => ({ name: $('#cName').value, seats: +$('#cSeats').value, consumption: +$('#cCons').value, fuel: $('#cFuel').value });

async function saveCar(asNew) {
  try {
    $('#cName').value = $('#cName').value.trim();
    const car = carFromForm();
    const id = $('#carSel').value;
    if (!$('#cName').reportValidity() || !$('#cSeats').reportValidity() || !$('#cCons').reportValidity()) return;
    const saved = asNew || !id
      ? { ...car, id: Math.max(0, ...state.cars.map(existing => existing.id)) + 1 }
      : { ...car, id: Number(id) };
    const nextCars = asNew || !id
      ? [...state.cars, saved]
      : state.cars.map(existing => existing.id === saved.id ? saved : existing);
    localStorage.setItem('tankteiler.cars', JSON.stringify(nextCars));
    await loadCars(saved.id);
    say('saved', 'success');
  } catch (e) { say('requestError', 'error', e.message); }
}

// ---------- Preise (TCS über unser Backend) ----------
function setPriceFromFuel() {
  if (state.prices) $('#price').value = state.prices[$('#cFuel').value];
}
function showPriceInfo() {
  const p = state.prices;
  $('#priceInfo').textContent = p ? `${t(p.source === 'tcs' ? 'priceTcs' : 'priceFb')} ${p.since || ''}` : '';
}

// ---------- Berechnung ----------
function calc() {
  const consumption = +$('#cCons').value || 0;
  const km = (+$('#km').value || 0) * ($('#round').checked ? 2 : 1);
  const liters = km * consumption / 100;
  const fuelCost = liters * (+$('#price').value || 0);
  const parking = Math.max(0, +$('#parking').value || 0);
  const roadFees = Math.max(0, +$('#roadFees').value || 0);
  const total = fuelCost + parking + roadFees;
  const seats = Math.max(1, +$('#cSeats').value || 1);
  const pax = Math.min(Math.max(1, +$('#pax').value || 1), seats);
  $('#pax').max = seats;
  $('#perPerson').textContent = Math.ceil(total / pax - 1e-9);   // auf ganze Franken aufrunden
  $('#total').textContent = total.toFixed(2) + ' CHF';
  $('#fuelCostOut').textContent = fuelCost.toFixed(2) + ' CHF';
  $('#parkingOut').textContent = parking.toFixed(2) + ' CHF';
  $('#roadFeesOut').textContent = roadFees.toFixed(2) + ' CHF';
  $('#distOut').textContent = km.toFixed(1) + ' km';
  $('#litersOut').textContent = liters.toFixed(1) + ' L';
}

// ---------- Karte (Google Maps) ----------
async function loadMapsScript() {
  const { mapsKey, mapId } = await api('/api/config');
  if (!mapsKey) { $('.nomap').textContent = ''; say('noKey', 'warning'); return; }
  window.initMap = () => initializeMap(mapId || 'DEMO_MAP_ID');
  const s = document.createElement('script');
  s.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&callback=initMap&loading=async&language=${state.lang}`;
  s.async = true;
  document.head.appendChild(s);
}

function initializeMap(mapId) {
  Promise.all([
    google.maps.importLibrary('maps'),
    google.maps.importLibrary('routes'),
    google.maps.importLibrary('geocoding'),
    google.maps.importLibrary('marker'),
  ]).then(([mapsLibrary, routesLibrary, geocodingLibrary, markerLibrary]) => {
    map = new mapsLibrary.Map($('#map'), {
      center: { lat: 46.8, lng: 8.2 },
      zoom: 8,
      mapId,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    });
    Route = routesLibrary.Route;
    geocoder = new geocodingLibrary.Geocoder();
    AdvancedMarkerElement = markerLibrary.AdvancedMarkerElement;
    PinElement = markerLibrary.PinElement;
    map.addListener('click', e => setMapPoint(e.latLng));
  }).catch(e => {
    console.error(e);
    say('routeErr', 'error');
  });
}

function stopKey(id) { return `stop-${id}`; }

function setMapPoint(latLng) {
  let target = activeTarget;
  if (!target) {
    if (!state.A) target = 'A';
    else if (!state.B) target = 'B';
    else {
      const emptyStop = state.stops.find(stop => !stop.location);
      if (emptyStop) target = stopKey(emptyStop.id);
    }
  }
  if (!target && state.A && state.B) {
    const stop = addStop(false);
    if (!stop) return;
    target = stopKey(stop.id);
  }
  setPoint(target, latLng);
}

function setPoint(target, latLng, label) {
  if (target === 'A' || target === 'B') {
    state[target] = latLng;
  } else {
    const stop = state.stops.find(item => stopKey(item.id) === target);
    if (!stop) return;
    stop.location = latLng;
    stop.label = label || '';
  }
  const index = state.stops.findIndex(stop => stopKey(stop.id) === target);
  let m = state.markers[target];
  if (!m) {
    const glyph = index >= 0 ? String(index + 1) : target;
    const pin = new PinElement({ glyph });
    m = state.markers[target] = new AdvancedMarkerElement({
      map,
      title: index >= 0 ? `${t('stop')} ${index + 1}` : target,
      content: pin.element,
      gmpDraggable: true,
    });
    m.addListener('dragend', e => setPoint(target, e.latLng));
  }
  m.position = latLng;
  const input = target === 'A' ? $('#from') : target === 'B' ? $('#to') : document.querySelector(`[data-stop-id="${target.slice(5)}"]`);
  if (label) input.value = label;
  else if (index >= 0) {
    input.value = `${latLng.lat().toFixed(4)}, ${latLng.lng().toFixed(4)}`;
    geocoder.geocode({ location: latLng }).then(r => {
      if (r.results[0] && input.isConnected) {
        input.value = r.results[0].formatted_address;
        const stop = state.stops.find(item => stopKey(item.id) === target);
        if (stop) stop.label = input.value;
      }
    }).catch(() => {});
  } else {
    input.value = `${latLng.lat().toFixed(4)}, ${latLng.lng().toFixed(4)}`;
    geocoder.geocode({ location: latLng }).then(r => { if (r.results[0]) input.value = r.results[0].formatted_address; }).catch(() => {});
  }
  updateStopMarkers();
  route();
}

function search(target, text) {
  if (!text.trim() || !geocoder) return;
  geocoder.geocode({ address: text, region: 'ch' })
    .then(r => {
      if (!r.results.length) throw new Error('not found');
      const loc = r.results[0].geometry.location;
      setPoint(target, loc, r.results[0].formatted_address);
      map.panTo(loc);
    })
    .catch(() => say('notFound', 'warning'));
}

function renderStops() {
  const container = $('#waypoints');
  if (!container) return;
  container.replaceChildren();
  state.stops.forEach((stop, index) => {
    const row = document.createElement('div');
    row.className = 'pt waypoint-row';
    const pin = document.createElement('span');
    pin.className = 'pin stop-pin';
    pin.textContent = String(index + 1);
    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = t('stopPlaceholder');
    input.dataset.stopId = stop.id;
    input.value = stop.label;
    const controls = document.createElement('div');
    controls.className = 'waypoint-controls';
    const up = document.createElement('button');
    up.type = 'button';
    up.className = 'waypoint-control';
    up.dataset.action = 'up';
    up.dataset.stopId = stop.id;
    up.textContent = '↑';
    up.setAttribute('aria-label', t('moveUp'));
    up.title = t('moveUp');
    up.disabled = index === 0;
    const down = document.createElement('button');
    down.type = 'button';
    down.className = 'waypoint-control';
    down.dataset.action = 'down';
    down.dataset.stopId = stop.id;
    down.textContent = '↓';
    down.setAttribute('aria-label', t('moveDown'));
    down.title = t('moveDown');
    down.disabled = index === state.stops.length - 1;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'waypoint-control waypoint-remove';
    remove.dataset.action = 'remove';
    remove.dataset.stopId = stop.id;
    remove.textContent = '×';
    remove.setAttribute('aria-label', t('removeStop'));
    remove.title = t('removeStop');
    controls.append(up, down, remove);
    row.append(pin, input, controls);
    container.append(row);
  });
  updateStopMarkers();
}

function updateStopMarkers() {
  state.stops.forEach((stop, index) => {
    const marker = state.markers[stopKey(stop.id)];
    if (!marker) return;
    marker.title = `${t('stop')} ${index + 1}`;
    marker.content = new PinElement({ glyph: String(index + 1) }).element;
  });
}

function addStop(recalculate = true) {
  if (state.stops.length >= 25) {
    say('stopLimit', 'warning');
    return null;
  }
  const stop = { id: nextStopId++, location: null, label: '' };
  state.stops.push(stop);
  renderStops();
  if (recalculate) route();
  const input = document.querySelector(`[data-stop-id="${stop.id}"]`);
  input?.focus();
  activeTarget = stopKey(stop.id);
  return stop;
}

function removeStop(id) {
  state.stops = state.stops.filter(stop => stop.id !== id);
  const key = stopKey(id);
  if (state.markers[key]) state.markers[key].map = null;
  delete state.markers[key];
  if (activeTarget === key) activeTarget = null;
  renderStops();
  route();
}

function moveStop(id, direction) {
  const index = state.stops.findIndex(stop => stop.id === id);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= state.stops.length) return;
  [state.stops[index], state.stops[next]] = [state.stops[next], state.stops[index]];
  renderStops();
  route();
}

function route() {
  const { A, B } = state;
  if (!A || !B || !Route) return;
  const requestId = ++routeRequestId;
  if (state.stops.some(stop => !stop.location)) {
    routePolylines.forEach(polyline => polyline.setMap(null));
    routePolylines = [];
    $('#km').value = 0;
    $('#gmaps').hidden = true;
    $('#appleMaps').hidden = true;
    $('#mapLinksHint').hidden = true;
    calc();
    say('completeStops', 'warning');
    return;
  }
  say('');
  const request = {
    origin: A,
    destination: B,
    travelMode: 'DRIVING',
    fields: ['distanceMeters', 'path'],
  };
  if (state.stops.length) request.intermediates = state.stops.map(stop => ({ location: stop.location }));
  Route.computeRoutes(request)
    .then(({ routes }) => {
      if (requestId !== routeRequestId) return;
      if (!routes?.length) throw new Error('No route found');
      routePolylines.forEach(polyline => polyline.setMap(null));
      routePolylines = routes[0].createPolylines();
      routePolylines.forEach(polyline => polyline.setMap(map));
      $('#km').value = (routes[0].distanceMeters / 1000).toFixed(1);   // Meter -> km
      updateLink(); calc();
    })
    .catch(e => {
      if (requestId !== routeRequestId) return;
      console.error(e);
      say('routeErr', 'error', e.code || e.message);
    });
}

function updateLink() {
  const { A, B } = state;
  const googleLink = $('#gmaps');
  const appleLink = $('#appleMaps');
  const mapLinksHint = $('#mapLinksHint');
  if (!A || !B) {
    googleLink.hidden = true;
    appleLink.hidden = true;
    mapLinksHint.hidden = true;
    return;
  }
  const params = new URLSearchParams({
    api: '1',
    origin: `${A.lat()},${A.lng()}`,
    destination: `${B.lat()},${B.lng()}`,
    travelmode: 'driving',
  });
  if (state.stops.length) params.set('waypoints', state.stops.map(stop => `${stop.location.lat()},${stop.location.lng()}`).join('|'));
  googleLink.href = `https://www.google.com/maps/dir/?${params}`;
  googleLink.hidden = false;
  const appleParams = new URLSearchParams({
    saddr: `${A.lat()},${A.lng()}`,
    daddr: `${B.lat()},${B.lng()}`,
    dirflg: 'd',
  });
  appleLink.href = `https://maps.apple.com/?${appleParams}`;
  appleLink.hidden = false;
  mapLinksHint.hidden = state.stops.length === 0;
  if (state.stops.length) mapLinksHint.textContent = t('appleStopsNote');
}

function resetRoute() {
  routeRequestId++;
  say('');
  Object.values(state.markers).forEach(m => { m.map = null; });
  state.markers = {}; state.A = state.B = null;
  state.stops = []; activeTarget = null;
  $('#from').value = $('#to').value = ''; $('#km').value = 0;
  renderStops();
  routePolylines.forEach(polyline => polyline.setMap(null));
  routePolylines = [];
  $('#gmaps').hidden = true; $('#appleMaps').hidden = true; $('#mapLinksHint').hidden = true; calc();
}

function swap() {
  const { A, B } = state;
  if (!A || !B) return;
  const [la, lb] = [$('#from').value, $('#to').value];
  state.A = B; state.B = A;
  $('#from').value = lb; $('#to').value = la;
  if (state.markers.A) state.markers.A.position = B;
  if (state.markers.B) state.markers.B.position = A;
  state.stops.reverse();
  renderStops();
  route();
}

// ---------- Start ----------
function init() {
  $('#lang').onchange = e => { state.lang = e.target.value; localStorage.setItem('lang', state.lang); applyLang(); };
  $('#theme').onclick = () => {
    const d = document.documentElement, v = d.dataset.theme === 'dark' ? 'light' : 'dark';
    d.dataset.theme = v; localStorage.setItem('theme', v);
  };
  document.documentElement.dataset.theme = localStorage.getItem('theme') || 'dark';

  $('#carSel').onchange = fillEditor;
  $('#cFuel').onchange = () => { setPriceFromFuel(); calc(); };
  ['#cSeats', '#cCons', '#km', '#pax', '#price', '#parking', '#roadFees', '#round'].forEach(s => $(s).addEventListener('input', calc));
  $('#save').onclick = () => saveCar(false);
  $('#saveNew').onclick = () => saveCar(true);
  $('#del').onclick = async () => {
    const id = $('#carSel').value;
    if (id) {
      try {
        const remainingCars = state.cars.filter(car => car.id !== Number(id));
        localStorage.setItem('tankteiler.cars', JSON.stringify(remainingCars));
        await loadCars();
        say('deleted', 'success');
      } catch (e) {
        say('requestError', 'error', e.message);
      }
    }
  };
  $('#from').addEventListener('keydown', e => e.key === 'Enter' && search('A', e.target.value));
  $('#to').addEventListener('keydown', e => e.key === 'Enter' && search('B', e.target.value));
  $('#from').addEventListener('focus', () => { activeTarget = 'A'; });
  $('#to').addEventListener('focus', () => { activeTarget = 'B'; });
  $('#waypoints').addEventListener('focusin', e => {
    if (e.target.matches('[data-stop-id]')) activeTarget = stopKey(Number(e.target.dataset.stopId));
  });
  $('#waypoints').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('[data-stop-id]')) {
      e.preventDefault();
      search(stopKey(Number(e.target.dataset.stopId)), e.target.value);
    }
  });
  $('#waypoints').addEventListener('click', e => {
    const button = e.target.closest('[data-action]');
    if (!button) return;
    const id = Number(button.dataset.stopId);
    if (button.dataset.action === 'remove') removeStop(id);
    if (button.dataset.action === 'up') moveStop(id, -1);
    if (button.dataset.action === 'down') moveStop(id, 1);
  });
  $('#addStop').onclick = () => addStop();
  $('#swap').onclick = swap;
  $('#reset').onclick = resetRoute;

  applyLang();
  api('/api/prices').then(p => { state.prices = p; setPriceFromFuel(); showPriceInfo(); calc(); });
  loadCars().catch(e => say('requestError', 'error', e.message));
  loadMapsScript();
}
init();
