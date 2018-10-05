import React, { Component } from 'react';
import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';

const weather_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
const weather_api = process.env.OPEN_WEATHER_MAP_API;
const timezonedb_api = process.env.TIMEZONEDB_API;

const App = () => {

    return (
      <div>
        <Header />
        <Main
          weather_api_key={weather_api_key}
          weather_api={weather_api}
          timezonedb_api={timezonedb_api}
        />
        <Footer />
      </div>
    );
};

export default App;
