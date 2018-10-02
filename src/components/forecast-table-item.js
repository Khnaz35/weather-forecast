import React, { Component } from 'react';
import Forecast from './forecast';

const ForecastTableItem = (props) => {
  const date = props.date;
  const high = props.high;
  const low = props.low;
  return (
    <tr>
      <td>{date}</td>
      <td>Sunny</td>
      <td>{high} / {low}</td>
      <td>40%</td>
      <td>SSW 10MPH</td>
      <td>20%</td>
    </tr>
  )
}

export default ForecastTableItem;
