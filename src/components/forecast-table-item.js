import React from 'react';

const ForecastTableItem = (props) => {
  const { date, high, low, description, wind, humidity, unit } = props;
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{high}&#176; / {low}&#176;</td>
      <td>{wind} {unit === 'metric' ? 'KM/H' : 'MPH'}</td>
      <td>{humidity}%</td>
    </tr>
  )
}

export default ForecastTableItem;
