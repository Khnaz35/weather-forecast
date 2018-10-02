import React, { Component } from 'react';
import axios from 'axios';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: []
    };
  }

  componentDidMount() {
    const api_key = process.env.OPEN_WEATHER_MAP_API_KEY.slice(0, -1);

    // axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=3582383&units=imperial&APPID=${api_key}`)
    // .then(res => {
    //   console.log(res.data)
    //   this.setState({forecast: res.data.list});
    // })
    // .catch(error => console.log(error))
  }

  render() {
    const forecastList = this.state.forecast;
    return(
      <div>
        {
          forecastList.length ?
          forecastList.map(forecast => {
            return (
              <div key={forecast.dt}>
                <p>{forecast.main.temp}</p>
              </div>
            )
          })
          : null
        }
      </div>
    )
  }
}
