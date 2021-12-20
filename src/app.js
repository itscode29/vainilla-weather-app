function centerTemperatures(temperature) {
  let temperatureElment = document.querySelector("#temperature");
  let degreeElement = document.querySelector("#degree");
  if (temperature < 10 && temperature > -10) {
    console.log("is small number");
    temperatureElment.classList.replace("col-8", "col-7");
    degreeElement.classList.replace("col-4", "col-5");
  } else {
    console.log("is big number");
    temperatureElment.classList.replace("col-7", "col-8");
    degreeElement.classList.replace("col-5", "col-4");
  }
}

function removeClasses(element) {
  element.classList.remove(
    "day-clear",
    "night-clear",
    "day-fog",
    "night-fog",
    "day-thunderstorm",
    "night-thunderstorm",
    "day-rain",
    "night-rain",
    "day-drizzle",
    "night-drizzle",
    "day-snow",
    "night-snow",
    "day-clouds",
    "night-clouds",
    "day-few-clouds",
    "night-few-clouds"
  );
}

function isDay() {
  if (sunrise < timestamp && sunset > timestamp) {
    return true;
  }
}

function isNight() {
  if (sunrise > timestamp || sunset < timestamp) {
    return true;
  }
}

function isFog(weather) {
  if (
    weather === "Fog" ||
    weather === "Smoke" ||
    weather === "Mist" ||
    weather === "Smoke" ||
    weather === "Haze" ||
    weather === "Dust" ||
    weather === "Sand" ||
    weather === "Ash" ||
    weather === "Squall" ||
    weather === "Tornado"
  ) {
    return true;
  }
}

function changeBackground(weather) {
  let backgroundElement = document.querySelector("#background");
  if (
    (weather.description === "broken clouds" && isDay()) ||
    (weather.description === "overcast clouds" && isDay())
  ) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-clouds");
  }
  if (
    (weather.description === "broken clouds" && isNight()) ||
    (weather.description === "overcast clouds" && isNight())
  ) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-clouds");
  }
  if (
    (weather.description === "few clouds" && isDay()) ||
    (weather.description === "scattered clouds" && isDay())
  ) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-few-clouds");
  }
  if (
    (weather.description === "few clouds" && isNight()) ||
    (weather.description === "scattered clouds" && isNight())
  ) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-few-clouds");
  }
  if (weather.main === "Clear" && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-clear");
  }
  if (weather.main === "Clear" && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-clear");
  }
  if (weather.main === "Thunderstorm" && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-thunderstorm");
  }
  if (weather.main === "Thunderstorm" && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-thunderstorm");
  }
  if (weather.main === "Drizzle" && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-drizzle");
  }
  if (weather.main === "Drizzle" && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-drizzle");
  }
  if (weather.main === "Rain" && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-rain");
  }
  if (weather.main === "Rain" && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-rain");
  }
  if (weather.main === "Snow" && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-snow");
  }
  if (weather.main === "Snow" && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-snow");
  }
  if (isFog(weather.main) && isDay()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("day-fog");
  }
  if (isFog(weather.main) && isNight()) {
    removeClasses(backgroundElement);
    backgroundElement.classList.add("night-fog");
  }
}

function formatTime(ts) {
  let date = new Date(ts);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getOrdinal() {
  let date = new Date(timestamp);
  let dayDate = date.getDate();
  if (dayDate === 1) {
    return "st";
  } else if (dayDate === 2 || dayDate === 22) {
    return "nd";
  } else if (dayDate === 3) {
    return "rd";
  } else {
    return "th";
  }
}

function formatDate(ts) {
  let date = new Date(ts);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayDate = date.getDate();
  let ordinal = getOrdinal(timestamp);
  return `${day}, ${month} ${dayDate}${ordinal}`;
}

function changeTimeDate() {
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime((timestamp + (timezone - 3600)) * 1000);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate((timestamp + (timezone - 3600)) * 1000);
}

function formatDayForecast(timestamp, timezone) {
  let date = new Date((timestamp + (timezone - 3600)) * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

// Display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (object, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
    <div class="col-3 icon">
    <img src=src/media/${
      object.weather[0].icon
    }.png alt="weather icon" width="24"/>
    </div>
    <div class="col-4 day">${formatDayForecast(
      object.dt,
      response.data.timezone_offset
    )}</div>
    <div class="col-5 max-min-temp">
    <span class="min">${Math.round(
      object.temp.min
    )}</span> | <span class="max">${Math.round(object.temp.max)}</span>
    </div>
    </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecastData(coordinates) {
  coords = coordinates;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

// Replace data
function displayTemperature(response) {
  debugger;
  city = response.data.name;
  temperature = response.data.main.temp;
  minTemp = response.data.main.temp_min;
  maxTemp = response.data.main.temp_max;
  windSpeed = response.data.wind.speed;
  temperature = Math.round(temperature);
  let temperatureElment = document.querySelector("#temperature");
  temperatureElment.innerHTML = temperature;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  let minElement = document.querySelector("#current-min-temp");
  minElement.innerHTML = Math.round(minTemp);
  let maxElement = document.querySelector("#current-max-temp");
  maxElement.innerHTML = Math.round(maxTemp);
  let desciptionElement = document.querySelector("#description");
  desciptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(windSpeed);
  timestamp = response.data.dt;
  timezone = response.data.timezone;
  sunset = response.data.sys.sunset;
  sunrise = response.data.sys.sunrise;
  centerTemperatures(temperature);
  changeTimeDate();
  changeBackground(response.data.weather[0]);
  getForecastData(response.data.coord);
}

// API Request
function showWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

// Search engine
function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  showWeather(cityInputElement.value);
}

// Unit change button
function changeUnits() {
  let windUnitsElement = document.querySelector("#wind-units");
  if (farenheitButton.classList.contains("btn-farenheit")) {
    units = "imperial";
    windUnitsElement.innerHTML = "mph";
    farenheitButton.classList.replace("btn-farenheit", "btn-celsius");
    farenheitButton.innerHTML = "ºC";
    showWeather(city);
    getForecastData(coords);
    centerTemperatures(Math.round(temperature));
  } else {
    units = "metric";
    windUnitsElement.innerHTML = "m/s";
    farenheitButton.classList.replace("btn-celsius", "btn-farenheit");
    farenheitButton.innerHTML = "ºF";
    showWeather(city);
    getForecastData(coords);
    centerTemperatures(Math.round(temperature));
  }
}

// Get current location data
function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// Global variables
let temperature = null;
let minTemp = null;
let maxTemp = null;
let windSpeed = null;
let units = "metric";
let coords = null;
let city = "Barcelona";
let timestamp = null;
let timezone = null;
let sunrise = null;
let sunset = null;
let apiKey = "055ee8048e7236318bbd1ee44ad667e0";

// Button event listeners
let farenheitButton = document.querySelector("#btn-farenheit");
farenheitButton.addEventListener("click", changeUnits);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentLocation);

showWeather(city);
