function aggregateForecast (cityForecast) {
  const aggregatedbyDay = [];
  let prevDate;
  let currentDate;
  for(let i = 0; i < cityForecast.length; i++) {
    const currentElement = cityForecast[i];
    const currentElementMain = cityForecast[i].main;
    currentDate = currentElement.dt_txt.slice(0, 10);
    if(i > 0) {currentElement.wind.speed
        prevDate = cityForecast[i-1].dt_txt.slice(0, 10);
      }
    if(i === 0 || currentDate !== prevDate) {
      const forecast = {
        date: currentDate,
        description: currentElement.weather[0].description,
        wind: currentElement.wind.speed,
        humidity: currentElementMain.humidity
      }
      aggregatedbyDay.push(forecast)
    }
    let aggregatedElement = aggregatedbyDay[aggregatedbyDay.length-1];
    const currentTemp = currentElementMain.temp;
    aggregatedElement.high = aggregatedElement.high ? Math.max(aggregatedElement.high, currentTemp) : currentTemp;
    aggregatedElement.low = aggregatedElement.low ? Math.min(aggregatedElement.low, currentTemp) : currentTemp;
  }
  return aggregatedbyDay;
}

module.exports = { aggregateForecast };
