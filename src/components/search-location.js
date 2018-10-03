import React, { Component } from 'react';
import Forecast from './forecast';
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

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Search by city name...' name='search'></input>
          <select name='unit'>
            <option value='farenheit'>Farenheit</option>
            <option value='celcius'>Celcius</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {
          this.state.error ?
          <h3>Error: please make sure city exists</h3>
          : null
        }
        {
          this.state.loading ?
          <h3>Loading weather forecast...</h3>
          : <Forecast
            cityInfo={this.state.cityInfo}
            forecast={this.state.forecast}
            unit={this.state.unit}
            />
        }
      </div>
    )
  }
}
