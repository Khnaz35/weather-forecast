# 5-day Weather Forecast

This app provides a 5-day weather forecast for anywhere in the world using the OpenWeatherMap forecast API. You can find the deployed app at https://get-the-forecast.herokuapp.com.

## General

I decided to use React.js to build this app. While it is possible to use vanilla JavaScript, which I considered at first, as well as other frameworks, React provides a powerful way to modularize code and create seamless single-page applications that easily manipulate the DOM.

Note that I did not use a starter kit, such as create-react-app, because I wanted to know exactly what is in my codebase and avoid unnecessary code.

Besides using the OpenWeatherMap API, the app takes advantage of a library called react-places-autocomplete which uses Google Maps Places Autocomplete, serving real-time suggestions to the user when searching for a location.
- note, the component 'auto-complete.js' is mostly taken from the react-places-autocomplete example for how to use the library; that said, I did have to make several changes to properly integrate it into my app.

Since all data from OpenWeatherMap is in UTC, I'm using the TimeZoneDB API to convert location coordinates (latitude and longitude provided by the Google Places API) to the timezone name, which I then pass to functions from a library called 'moment-timezone' to get the local date and time for that location.

## Build and run in development

To use the app locally, follow the steps below:

1. Fork (optional) and clone the repo
2. 'npm install'
3. 'npm run start-dev' (this will build webpack and start a local server on port 3000)

Note that in order to use the app in development you will need the following:

1. An OpenWeatherMap API key (create an account and get key at https://openweathermap.org/). Once you have the key, create a '.env' file in the root directory of the project and store the key in the following format:
OPEN_WEATHER_MAP_API_KEY = YOUR_API_KEY_HERE

2. A Google Maps API key. Once you have this key, open the /public/index.html file and add it to the script with the Google API endpoint, as follows:
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places

## Improvements

The following are bug fixes and potential feature additions and architecture changes to implement in future updates:

- [bug] Currently, once the forecast is fetched and displayed on screen, selecting a new location will change the visible location above the forecast table, yet will not fetch the new weather data until the 'get forecast' button is clicked.
- [feature] The app can be expanded to support more than just the 5-hour forecast (hourly, daily, 10-day, etc).
- [feature] Clicking on a specific date in the forecast table should expand the row and give more weather details for that day.
- [architecture] Implementing redux to manage state. While the app is small and managable, there are still several components passing props to their children, in some cases multiple levels deep. Using redux will allow for better state management and more seamless access of data for components.





