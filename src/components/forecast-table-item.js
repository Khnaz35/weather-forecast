import React from 'react';
import moment from 'moment';

const ForecastTableItem = (props) => {
  const { date, high, low, description, wind, humidity, unit } = props;
  const dayOfWeek = moment(date).calendar().slice(0, -12);
  return (
    <tr>
      <td>{dayOfWeek}</td>
      <td>{description}</td>
      <td>{high}&#176; / {low}&#176;</td>
      <td>{wind} {unit === 'metric' ? 'KM/H' : 'MPH'}</td>
      <td>{humidity}%</td>
    </tr>
  )
}

export default ForecastTableItem;
