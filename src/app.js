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
  let temperature = Math.round(response.data.main.temp);
  let degreeElement = document.querySelector("#degree");
  temperatureElment.innerHTML = temperature;
  // Center temperatures below 10
  if (temperature < 10 && temperature > -10) {
    temperatureElment.classList.remove("col-8");
    temperatureElment.classList.add("col-7");
    degreeElement.classList.remove("col-4");
    degreeElement.classList.add("col-5");
  } else {
    temperatureElment.classList.remove("col-7");
    temperatureElment.classList.add("col-8");
    degreeElement.classList.remove("col-5");
    degreeElement.classList.add("col-4");
  }
  //
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let minElement = document.querySelector("#current-min-temp");
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxElement = document.querySelector("#current-max-temp");
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  let desciptionElement = document.querySelector("#description");
  desciptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  // Change time according to location
  let timeElement = document.querySelector("#time");
  let timestamp = response.data.dt;
  let timezone = response.data.timezone;
  timeElement.innerHTML = formatTime((timestamp + (timezone - 3600)) * 1000);
  // Change date
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate((timestamp + (timezone - 3600)) * 1000);
}

function showWeather(city) {
  let apiKey = "055ee8048e7236318bbd1ee44ad667e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  showWeather(cityInputElement.value);
}

showWeather("Barcelona");

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);
