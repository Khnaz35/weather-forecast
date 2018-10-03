import React, { Component } from 'react';
import Forecast from './forecast';
import Welcome from './welcome-message';
import axios from 'axios';




export default class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInfo: {},
      forecast: [],
      unit: '',
      loading: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    const { weather_api_key, weather_api, timezonedb_api } = this.props;
    const unit = event.target.unit.value === 'celcius' ? 'metric' : 'imperial';
    const city = event.target.search.value;
    event.target.reset();
    let lat, lon, forecastData;

    axios.get(`${weather_api}/forecast?q=${city}&type=accurate&units=${unit}&APPID=${weather_api_key}`)
    .then(res => {
      console.log(res.data)
      lat = res.data.city.coord.lat;
      lon = res.data.city.coord.lon;
      forecastData = res.data;
      return axios.get(`${timezonedb_api}by=position&lat=${lat}&lng=${lon}`)
    .then(timezoneData => {
        forecastData.city.timezoneName = timezoneData.data.zoneName;
        this.setState({cityInfo: forecastData.city, forecast: forecastData.list, unit: unit, loading: false, error: false});
      })
    })
    .catch(error => {
      this.setState({error: true, loading: false})
    });
  }

  render() {

    const { cityInfo, forecast, unit, error, loading } = this.state;

    return (
      <div className='main-container'>
        {
          forecast.length ?
          null
          : <Welcome />
        }

        <form onSubmit={this.handleSubmit}>
          <div className='form-input-container'>
            <input type='text'
              placeholder='Search by city name...'
              name='search'>
            </input>
            <div className='styled-select blue semi-square'>
              <select name='unit'>
                <option value='farenheit'>Farenheit</option>
                <option value='celcius'>Celcius</option>
              </select>
            </div>
          </div>
          <button type="submit">Get forecast</button>
        </form>
        {
          error && !loading ?
          <h3 className='error'>Error: please make sure city exists</h3>
          : null
        }
        {
          loading ?
          <h3>Loading weather forecast...</h3>
          : !error ? <Forecast
            cityInfo={cityInfo}
            forecast={forecast}
            unit={unit}
            />
            : null
        }
      </div>
    )
  }
}



