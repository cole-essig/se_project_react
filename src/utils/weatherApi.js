export const getWeather = (APIkey, latitude, longitude) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
).then((res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Error: ${res.status}`);
    }
})
}

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = { F: data.main.temp}
    result.type = getWeatherType(result.temp.F)
    result.condition = data.weather[0].main;
    result.isDay = isDay(data.sys, Date.now())
    return result;
}

const isDay = ({ sunrise, sunset}, now) => {
  return ((sunrise * 1000) < now) && (now < (sunset *1000));
}

const getWeatherType = (temp) => {
  if (temp > 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
}