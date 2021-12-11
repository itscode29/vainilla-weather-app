let apiKey = "055ee8048e7236318bbd1ee44ad667e0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiKey}&units=metric`;

// Replace temperatures, city, desciption and navbar
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElment = document.querySelector("#temperature");
  temperatureElment.innerHTML = Math.round(response.data.main.temp);
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
}

axios.get(apiUrl).then(displayTemperature);
