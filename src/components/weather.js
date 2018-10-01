import React, { Component } from 'react';
import axios from 'axios';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: 'no data'
    };
  }

  componentDidMount() {
    const api_key = process.env.OPEN_WEATHER_MAP_API_KEY.slice(0, -2);

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=3582383&units=imperial&&APPID=${api_key}`)
    .then(res => console.log('RESPONSE HERE!!!', res))
  }

  render() {
    return(
      <h3>{this.state.weather}</h3>
    );
  }
}
