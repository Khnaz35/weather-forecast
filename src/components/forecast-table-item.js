import React from 'react';
import moment from 'moment';

const ForecastTableItem = (props) => {
  const { date, high, low, description, icon, wind, humidity, unit } = props;
  const dayOfWeek = moment(date).calendar().slice(0, -12);
  const formattedDate = moment(date).format("MMM Do");
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`
  const iconStyle = {backgroundImage: `url(${iconUrl})`}
  return (
    <tr>
      <td>{dayOfWeek} <span className='formattedDate'>{formattedDate}</span></td>
      <td style={iconStyle} className='description'>{description}</td>
      <td>{high}&#176; / {low}&#176;</td>
      <td>{wind} {unit === 'metric' ? 'KM/H' : 'MPH'}</td>
      <td>{humidity}%</td>
    </tr>
  )
}

export default ForecastTableItem;
