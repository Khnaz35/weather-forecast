import React, { Component } from 'react';
import Weather from './components/weather';
import SearchLocation from './components/search-location';

const App = () => {
    return (
      <div>
        <h1>5-Day Weather Forecast</h1>
        <SearchLocation />
        <Weather />
      </div>
    );
};

export default App;
