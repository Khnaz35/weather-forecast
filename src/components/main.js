import React, { Component } from 'react';
import Forecast from './forecast';
import Welcome from './welcome-message';
import Form from './form';
import axios from 'axios';
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: '',
      inputEmpty: true,
      latLng: {},
      cityInfo: {},
      forecast: [],
      unit: '',
      loading: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedAddress, placeId) {
    geocodeByPlaceId(placeId)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      this.setState({
        selectedAddress,
        latLng,
        inputEmpty: false
      });
    })
    .catch(() => {
      this.setState({error: true})
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    const { weather_api_key, weather_api, timezonedb_api } = this.props;
    const unit = event.target.unit.value === 'celcius' ? 'metric' : 'imperial';
    const {latLng} = this.state;
    let forecastData;
    axios.get(`${weather_api}/forecast?units=${unit}&lat=${latLng.lat}&lon=${latLng.lng}&APPID=${weather_api_key}`)
    .then(res => {
      forecastData = res.data;
      return axios.get(`${timezonedb_api}by=position&lat=${latLng.lat}&lng=${latLng.lng}`)
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
    const { cityInfo, forecast, unit, error, loading, inputEmpty, selectedAddress } = this.state;
    return (
      <div className='main-container'>
        {
          forecast.length ?
            null
            : <Welcome />
        }
        <Form
          handleSubmit={this.handleSubmit}
          handleSelect={this.handleSelect}
          inputEmpty={inputEmpty}
          selectedAddress={selectedAddress}
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
            selectedAddress={selectedAddress}
            />
            : null
        }
      </div>
    )
  }
}



