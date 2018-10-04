import React, { Component } from 'react';
import Forecast from './forecast';
import Welcome from './welcome-message';
import Form from './form';
import axios from 'axios';

export default class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmpty: true,
      cityInfo: {},
      forecast: [],
      unit: '',
      loading: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value.length) {
      this.setState({inputEmpty: false});
    }
    else {
      this.setState({inputEmpty: true});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    event = event.target;
    this.setState({loading: true});
    const { weather_api_key, weather_api, timezonedb_api } = this.props;
    const unit = event.unit.value === 'celcius' ? 'metric' : 'imperial';
    const city = event.search.value;
    event.reset();
    let lat, lon, forecastData;
    axios.get(`${weather_api}/forecast?q=${city}&type=accurate&units=${unit}&APPID=${weather_api_key}`)
    .then(res => {
      lat = res.data.city.coord.lat;
      lon = res.data.city.coord.lon;
      forecastData = res.data;
      return axios.get(`${timezonedb_api}by=position&lat=${lat}&lng=${lon}`)
    .then(timezoneData => {
      forecastData.city.timezoneName = timezoneData.data.zoneName;
      this.setState({cityInfo: forecastData.city, forecast: forecastData.list, unit: unit, loading: false, error: false, inputEmpty: true});
      })
    })
    .catch(() => {
      this.setState({error: true, loading: false, inputEmpty: true})
    });
  }

  render() {
    const { cityInfo, forecast, unit, error, loading, inputEmpty } = this.state;
    return (
      <div className='main-container'>
        {
          forecast.length ?
            null
            : <Welcome />
        }
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          inputEmpty={inputEmpty}
        />
        {
          error && !loading ?
            <h3 className='error'>Error: please make sure city exists</h3>
            : null
        }
        {
          loading ?
            <h3>Loading weather forecast...</h3>
            : !error ?
            <Forecast
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



