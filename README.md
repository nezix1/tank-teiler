# TankTeiler

**Plan a shared car trip. Split the costs fairly.**

TankTeiler is a web app that estimates fuel and parking costs for a shared
journey and shows each passenger's share.

Try it: **[tankteiler.onrender.com](https://tankteiler.onrender.com/)**

## How it works

1. Choose a starting point, destination, and any stops along the way.
2. Select a car and enter the number of people travelling.
3. TankTeiler gets the route distance from Google Maps and estimates the fuel
   needed from the car's consumption.
4. It adds any parking fee and divides the total by the number of passengers.
5. Open the route in Google Maps or Apple Maps.

The app also lets you save vehicle details and use the interface in German,
English, or Russian.

## The calculation

```text
fuel needed = distance × fuel consumption ÷ 100
trip cost   = fuel needed × price per litre + parking
per person  = trip cost ÷ passengers
```

The result is an estimate based on the values entered; it does not include
other possible costs such as tolls.

## Why Render?

TankTeiler needs a small server to provide vehicle storage and fuel-price data.
GitHub Pages hosts static websites, but cannot run that server. Render runs the
web app and its server together, so the demo works from one link.

## Technology

HTML, CSS, and JavaScript · Node.js and Express · SQLite · Google Maps

## Project

Created by [Illia Honcharov](https://github.com/nezix1).
