import React from 'react';
import axios from 'axios';
import { aggregateForecast } from '../utils';
import ForecastTableItem from './forecast-table-item';

const Forecast = (props) => {
  const { cityInfo, forecast, unit, selectedAddress } = props;
  const currentTemp = forecast.length ? forecast[0].main.temp : null;
  const forecastByDay = aggregateForecast(forecast, cityInfo.timezoneName);

  return(
    <div>
      {
        forecastByDay.length ?
        <div>
          <div className='forecast-header-container'>
            <h2 className='forecast-header'>{selectedAddress}</h2>
            <h3 className='forecast-header'>Current temperature: {forecast[0].main.temp}&#176; {unit === 'metric' ? 'celcius' : 'farenheit'}</h3>
          </div>
          <div className='table-container'>
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
                        icon={forecast.icon}
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
        </div>
        : null
      }
    </div>
  )
}

export default Forecast;
