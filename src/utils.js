const moment = require('moment-timezone');

function aggregateForecast (cityForecast, timezone) {
  const aggregatedbyDay = [];
  let prevDate;
  let currentDate;
  for(let i = 0; i < cityForecast.length; i++) {
    const currentElement = cityForecast[i];
    const currentElementMain = cityForecast[i].main;
    const convertedDate = convertTimeZone(currentElement.dt_txt, timezone);
    if(i > 0) {
        prevDate = convertTimeZone(cityForecast[i-1].dt_txt, timezone);
      }
    if(i === 0 || convertedDate !== prevDate) {
      const forecast = setInitialForecast(convertedDate, currentElement);
      aggregatedbyDay.push(forecast)
    }
    let aggregatedElement = aggregatedbyDay[aggregatedbyDay.length-1];
    const currentTemp = currentElement.main.temp;
    aggregatedElement.high = aggregatedElement.high ? Math.max(aggregatedElement.high, currentTemp) : currentTemp;
    aggregatedElement.low = aggregatedElement.low ? Math.min(aggregatedElement.low, currentTemp) : currentTemp;
  }
  return aggregatedbyDay.slice(0, 5);
}

function setInitialForecast(date, forecast) {
  return {
    date,
    description: forecast.weather[0].description,
    icon: `${forecast.weather[0].icon.slice(0,-1)}d`,
    wind: forecast.wind.speed,
    humidity: forecast.main.humidity
  }
}

function convertTimeZone(timestamp, timezone) {
    let utc = moment.tz(timestamp, 'Europe/London').format();
    return moment.tz(utc, timezone).format().slice(0, 10);
}

function setValue(input, selectedAddress, isUpdated) {
  if(!selectedAddress || isUpdated) {
    return input;
  }
  else if(!isUpdated) {
    return selectedAddress;
  }
}

module.exports = { aggregateForecast, setValue, setInitialForecast };
