# TankTeiler

**Split shared trip costs fairly.**

TankTeiler is a small, multilingual web app for planning a shared car trip and
estimating each passenger's share of the costs. Add a route and stops, choose a
car, enter the fuel and parking costs, and see the breakdown.

## Features

- Google Maps route planning with draggable start and destination markers
- Add, remove, and reorder intermediate stops
- Estimate fuel use and split fuel and parking costs between passengers
- Open the route in Google Maps or Apple Maps
- Save and edit vehicle details
- German, English, and Russian interface
- Responsive layout and presentation page

## Built with

- Frontend: HTML, CSS, and vanilla JavaScript
- Backend: Node.js and Express
- Vehicle storage: SQLite (`better-sqlite3`)
- Maps and route planning: Google Maps JavaScript API and Routes API
- Fuel prices: TCS

## Run locally

Use Node.js 18 or newer.

```sh
npm ci
cp .env.example .env
```

Add a Google Maps API key to `.env`. Enable the **Maps JavaScript API**,
**Routes API**, and **Geocoding API** in Google Cloud. Restrict the key to the
websites that will use it and to the APIs the app needs.

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000). The presentation is at
`/presentation`, and the German/Russian speaker notes are available at
`/speech`.

The app reads and writes vehicle information to `tankteiler.db` in the project
directory. The database and `.env` file are intentionally excluded from Git.

## Deploy a live demo

GitHub Pages publishes static files; it does not run the Express server or
SQLite database. TankTeiler needs its server for vehicle storage, fuel prices,
and Maps configuration, so publishing the `public` folder to GitHub Pages alone
will **not** make the complete app work.

The included `render.yaml` deploys the complete app as one Node.js web service
on Render:

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and connect this repository.
3. Add the `GOOGLE_MAPS_API_KEY` environment variable when prompted.
4. Deploy the Blueprint and open the `.onrender.com` address Render assigns.

The frontend and API share the same origin, so no separate CORS setup is
needed. The presentation's final slide generates its QR code from the deployed
site's current address; it only shows the code on a hosted site, not on
`localhost`.

The Blueprint uses Render's free service plan. Free instances can sleep while
idle, and their local filesystem is temporary, so saved vehicle changes and
SQLite data may reset after a restart or redeploy. For persistent data, use a
host with persistent storage or move vehicle storage to a managed database.

Never commit `.env`, API credentials, or the SQLite database. A Maps key used
in a browser is visible to visitors; protect it with HTTP-referrer and API
restrictions in Google Cloud.

## Repository

GitHub repository: [nezix1/tank-teiler](https://github.com/nezix1/tank-teiler)
