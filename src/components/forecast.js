import React, { Component } from 'react';
import axios from 'axios';
import { aggregateForecast } from '../utils';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: []
    };
  }


  render() {
    const cityForecast = this.props.forecast;
    const currentTemp = cityForecast.length ? cityForecast[0].main.temp : null;
    const forecastByDay = aggregateForecast(cityForecast);

    return(
      <div>
        <h3>Current Temperature: {currentTemp}</h3>
        {
          forecastByDay.length ?
          forecastByDay.map((forecast, idx) => {
            return (
              <div key={idx}>
                <p>Date: {forecast.date}</p>
                <p>High: {forecast.high}</p>
                <p>Low: {forecast.low}</p>
              </div>
            )
          })
          : null
        }
      </div>
    )
  }
}
