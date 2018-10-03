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
    const { cityInfo, forecast, unit } = this.props;
    const currentTemp = forecast.length ? forecast[0].main.temp : null;
    const forecastByDay = aggregateForecast(forecast, cityInfo.timezoneName);

    return(
      <div>
        {
          forecastByDay.length ?
          <div>
            <h2>{cityInfo.name}</h2>
            <h3>Current temperature: {forecast[0].main.temp}&#176; {unit === 'metric' ? 'celcius' : 'farenheit'}</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Description</th>
                  <th>High / Low</th>
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
                        description={forecast.description}
                        wind={forecast.wind}
                        humidity={forecast.humidity}
                        unit={unit}
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
