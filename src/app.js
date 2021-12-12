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

function formatDate(timestamp) {
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
  let ordinal = getOrdinal();
  return `${day}, ${month} ${dayDate}${ordinal}`;
}

// Replace data
function displayTemperature(response) {
  let temperatureElment = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = response.data.main.temp_min;
  celsiusMaxTemp = response.data.main.temp_max;
  metricWindSpeed = response.data.wind.speed;
  let temperature = Math.round(celsiusTemperature);
  let degreeElement = document.querySelector("#degree");
  temperatureElment.innerHTML = temperature;
  // Center temperatures below 10
  if (temperature < 10 && temperature > -10) {
    temperatureElment.classList.replace("col-8", "col-7");
    degreeElement.classList.replace("col-4", "col-5");
  } else {
    temperatureElment.classList.replace("col-7", "col-8");
    degreeElement.classList.replace("col-5", "col-4");
  }
  //
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
  // Change time according to location
  let timeElement = document.querySelector("#time");
  let timestamp = response.data.dt;
  let timezone = response.data.timezone;
  timeElement.innerHTML = formatTime((timestamp + (timezone - 3600)) * 1000);
  // Change date
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate((timestamp + (timezone - 3600)) * 1000);
}

// API Request
function showWeather(city) {
  let apiKey = "055ee8048e7236318bbd1ee44ad667e0";
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
  debugger;
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

// Global variables
let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
let metricWindSpeed = null;

// Button event listeners
let farenheitButton = document.querySelector("#btn-farenheit");
farenheitButton.addEventListener("click", changeUnits);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

showWeather("Barcelona");
