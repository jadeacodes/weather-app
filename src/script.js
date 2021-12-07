function formatDate(date) {
  let hours = date.getHours();
  if (hours > 13) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-current").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#today-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "53c16343fbb5ddb0fbed4eefb853a21b";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "53c16343fbb5ddb0fbed4eefb853a21b";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-current");
  temperatureElement.innerHTML = `83`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-current");
  temperatureElement.innerHTML = `28`;
}

// Show date of current location
let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);

// Search by city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

// Search by current location
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

// Search city on load
searchCity("New York");

// Show converted temperature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
