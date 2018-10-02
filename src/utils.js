function aggregateForecast (cityForecast) {
  const aggregatedbyDay = [];
  let prevDate;
  let currentDate;
  for(let i = 0; i < cityForecast.length; i++) {
    currentDate = cityForecast[i].dt_txt.slice(0, 10);
    if(i > 0) {
        prevDate = cityForecast[i-1].dt_txt.slice(0, 10);
      }
    if(i === 0 || currentDate !== prevDate) {
      const date = {date: currentDate}
      aggregatedbyDay.push(date)
    }
    let currentElement = aggregatedbyDay[aggregatedbyDay.length-1];
    const currentTemp = cityForecast[i].main.temp;
    currentElement.high = currentElement.high ? Math.max(currentElement.high, currentTemp) : currentTemp;
    currentElement.low = currentElement.low ? Math.min(currentElement.low, currentTemp) : currentTemp;
  }
  return aggregatedbyDay;
}

module.exports = { aggregateForecast };
