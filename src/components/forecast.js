import React, { Component } from 'react';
import axios from 'axios';
import { aggregateForecast } from '../utils';
import ForecastTableItem from './forecast-table-item';

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
        {
          forecastByDay.length ?
          <div>
            <h3>Current Temperature: {currentTemp}</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Description</th>
                  <th>High / Low</th>
                  <th>Precipitation</th>
                  <th>Wind</th>
                  <th>Humidity</th>
                </tr>
                {
                  forecastByDay.map(forecast => {
                    return (
                      <ForecastTableItem
                        key={forecast.date}
                        date={forecast.date}
                        high={forecast.high}
                        low={forecast.low}
                      />
                    )
                  })
                }
              </thead>
            </table>
          </div>
          : null
        }
      </div>
    )
  }
}
