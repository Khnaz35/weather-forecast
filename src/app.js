import React, { Component } from 'react';
import SearchLocation from './components/search-location';

const weather_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
const weather_api = process.env.OPEN_WEATHER_MAP_API;
const timezonedb_api = process.env.TIMEZONEDB_API;

const App = () => {

    return (
      <div id='app'>
        <h1>5-Day Weather Forecast</h1>
        <SearchLocation
          weather_api_key={weather_api_key}
          weather_api={weather_api}
          timezonedb_api={timezonedb_api}
        />
      </div>
    );
};

export default App;
