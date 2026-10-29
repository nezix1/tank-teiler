# TankTeiler

**Plan a shared car trip. Split the costs fairly.**

TankTeiler is a web app that estimates fuel, parking, and toll costs for a
shared journey and shows each passenger's share.

Try it: **[tankteiler.onrender.com](https://tankteiler.onrender.com/)**

## How it works

1. Choose a starting point, destination, and any stops along the way.
2. Add and save your car's name, fuel type, and consumption, then enter the
   number of people travelling.
3. TankTeiler gets the route distance from Google Maps and estimates the fuel
   needed from the car's consumption.
4. Add parking and toll fees for the whole trip. The app divides the total by
   the number of passengers.
5. Open the route in Google Maps or Apple Maps.

The app also lets you add and save your own vehicle details and use the
interface in German, English, or Russian. Vehicle details stay in that
browser's local storage; they are not shared with other visitors.

## The calculation

```text
fuel needed = distance × fuel consumption ÷ 100
trip cost   = fuel needed × price per litre + parking + tolls
per person  = trip cost ÷ passengers
```

For a round trip, fuel costs are doubled. Parking and tolls are entered once as
the total for the trip and are not doubled.

## Why Render?

TankTeiler uses a small server to provide fuel-price data and Google Maps
configuration. GitHub Pages hosts static websites, but cannot run that server.
Render runs the web app and its server together, so the demo works from one link.

## Technology

HTML, CSS, and JavaScript · Browser local storage · Node.js and Express · Google Maps

## More information

- [Presentation](https://tankteiler.onrender.com/presentation)
- [Simple German speech text](https://tankteiler.onrender.com/speech)
- [Detailed Russian API guide](https://tankteiler.onrender.com/api-guide)

## Project

Created by [Illia Honcharov](https://github.com/nezix1).
