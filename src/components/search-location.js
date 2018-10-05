import React, { Component } from 'react';
import Forecast from './forecast';
import Welcome from './welcome-message';
import Form from './form';

import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedAddress: '',
      inputEmpty: true,
      latLng: {},
      cityInfo: {},
      forecast: [],
      unit: '',
      loading: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // handleChange(event) {
  //   const input = event.target.value;
  //   if(input !== null) {
  //     this.setState({inputEmpty: false});
  //   }
  //   else {
  //     this.setState({inputEmpty: true});
  //   }
  // }

  handleSelect(address) {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng)
      this.setState({address, latLng, inputEmpty: false});
    })
    .catch(() => {
      this.setState({error: true, inputEmpty: true})
    });
  }

  handleSubmit(event) {
    console.log('!!!!', this.state.latLng.lat, this.state.latLng.lng)
    event.preventDefault();
    event = event.target;
    this.setState({loading: true});
    const { weather_api_key, weather_api, timezonedb_api } = this.props;
    const unit = event.unit.value === 'celcius' ? 'metric' : 'imperial';
    // const city = event.search.value;
    event.reset();
    const {latLng} = this.state;
    let forecastData;
    axios.get(`${weather_api}/forecast?units=${unit}&lat=${latLng.lat}&lon=${latLng.lng}&APPID=${weather_api_key}`)
    // axios.get(`${weather_api}/forecast?q=${city}&type=accurate&units=${unit}&APPID=${weather_api_key}`)
    .then(res => {
      // lat = res.data.city.coord.lat;
      // lon = res.data.city.coord.lon;
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
    const { cityInfo, forecast, unit, error, loading, inputEmpty, suggestedAddress } = this.state;
    console.log('address....', suggestedAddress)
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
            address={suggestedAddress}
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



