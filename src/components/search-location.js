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
    const unit = event.target.unit.value === 'celcius' ? 'metric' : 'imperial';
    const api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
    const city = event.target.search.value;
    event.target.reset();

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&units=${unit}&APPID=${api_key}`)
    .then(res => {
      console.log(res.data)
      this.setState({cityInfo: res.data.city, forecast: res.data.list, unit: unit, loading: false, error: false});
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
          <h3>Loading...</h3>
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
