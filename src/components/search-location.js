import React, { Component } from 'react';
import Forecast from './forecast';
import axios from 'axios';

export default class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      forecast: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();

    const api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
    const city = event.target.search.value;
    event.target.reset();
    const countryCode = 'us';

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&units=imperial&APPID=af80bfbd91752fc16e6517fe9698d31a`)
    .then(res => {
      console.log(res.data)
      this.setState({forecast: res.data.list});
    })
    .catch(error => console.log(error));
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Search by city name...' name='search'></input>
          <button type="submit">Submit</button>
        </form>
        <Forecast forecast={this.state.forecast}/>
      </div>
    )
  }
}
