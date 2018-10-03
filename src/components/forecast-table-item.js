import React from 'react';
import moment from 'moment';

const ForecastTableItem = (props) => {
  const { date, high, low, description, icon, wind, humidity, unit } = props;
  const dayOfWeek = moment(date).calendar().slice(0, -12);
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`
  const iconStyle = {
    backgroundImage: `url(${iconUrl})`,
    backgroundSize: '20px',
    backgroundPosition: '10px 10px',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <tr>
      <td>{dayOfWeek}</td>
      <td style={iconStyle} className='description'>{description}</td>
      <td>{high}&#176; / {low}&#176;</td>
      <td>{wind} {unit === 'metric' ? 'KM/H' : 'MPH'}</td>
      <td>{humidity}%</td>
    </tr>
  )
}

export default ForecastTableItem;
