function centerTemperatures(temperature) {
  let temperatureElment = document.querySelector("#temperature");
  let degreeElement = document.querySelector("#degree");
  if (temperature < 10 && temperature > -10) {
    temperatureElment.classList.replace("col-8", "col-7");
    degreeElement.classList.replace("col-4", "col-5");
  } else {
    temperatureElment.classList.replace("col-7", "col-8");
    degreeElement.classList.replace("col-5", "col-4");
  }
}

function changeBackground(weather) {
  let backgroundElement = document.querySelector("#background");
  if (weather === "Clouds") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-clouds");
  }
  if (weather === "Clear") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-clear");
  }
  if (weather === "Thunderstorm") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-thunderstorm");
  }
  if (weather === "Drizzle") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-drizzle");
  }
  if (weather === "Rain") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-rain");
  }
  if (weather === "Snow") {
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-snow");
  }
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
    backgroundElement.classList.remove(
      "day-clear",
      "day-fog",
      "day-thunderstorm",
      "day-rain",
      "day-drizzle",
      "day-snow",
      "day-clouds"
    );
    backgroundElement.classList.add("day-fog");
  }
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
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

function getOrdinal(timestamp) {
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

function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function changeTimeDate(timestamp, timezone) {
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
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (object, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
    <div class="col-3 icon">
    <img src="http://openweathermap.org/img/wn/${
      object.weather[0].icon
    }@2x.png" alt="weather icon" width="35"/>
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
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Replace data
function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = response.data.main.temp_min;
  celsiusMaxTemp = response.data.main.temp_max;
  metricWindSpeed = response.data.wind.speed;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElment = document.querySelector("#temperature");
  temperatureElment.innerHTML = temperature;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let minElement = document.querySelector("#current-min-temp");
  minElement.innerHTML = Math.round(celsiusMinTemp);
  let maxElement = document.querySelector("#current-max-temp");
  maxElement.innerHTML = Math.round(celsiusMaxTemp);
  let desciptionElement = document.querySelector("#description");
  desciptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(metricWindSpeed);
  centerTemperatures(temperature);
  changeTimeDate(response.data.dt, response.data.timezone);
  changeBackground(response.data.weather[0].main);
  getForecastData(response.data.coord);
}

// API Request
function showWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let mainTempElement = document.querySelector("#temperature");
  let minTempElement = document.querySelector("#current-min-temp");
  let maxTempElement = document.querySelector("#current-max-temp");
  let windSpeedElement = document.querySelector("#wind-speed");
  let windUnitsElement = document.querySelector("#wind-units");
  if (farenheitButton.classList.contains("btn-farenheit")) {
    let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    mainTempElement.innerHTML = Math.round(farenheitTemperature);
    let farenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
    minTempElement.innerHTML = Math.round(farenheitMinTemp);
    let farenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
    maxTempElement.innerHTML = Math.round(farenheitMaxTemp);
    let imperialWindSpeed = metricWindSpeed * 2.237;
    windSpeedElement.innerHTML = Math.round(imperialWindSpeed);
    windUnitsElement.innerHTML = "mph";
    farenheitButton.classList.replace("btn-farenheit", "btn-celsius");
    farenheitButton.innerHTML = "ºC";
  } else {
    mainTempElement.innerHTML = Math.round(celsiusTemperature);
    minTempElement.innerHTML = Math.round(celsiusMinTemp);
    maxTempElement.innerHTML = Math.round(celsiusMaxTemp);
    windSpeedElement.innerHTML = Math.round(metricWindSpeed);
    windUnitsElement.innerHTML = "m/s";
    farenheitButton.classList.replace("btn-celsius", "btn-farenheit");
    farenheitButton.innerHTML = "ºF";
  }
}

// Get current location data
function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// Global variables
let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
let metricWindSpeed = null;
let apiKey = "055ee8048e7236318bbd1ee44ad667e0";

// Button event listeners
let farenheitButton = document.querySelector("#btn-farenheit");
farenheitButton.addEventListener("click", changeUnits);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentLocation);

showWeather("Barcelona");
