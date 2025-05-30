const apiKey = '339e8ef32597cea585e5fa6f331f68c1';

const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const geoBtn = document.getElementById('geo-btn');

const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  }
});

geoBtn.addEventListener('click', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.error("Geolocation Error:", error);
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("API Response:", data); // Debug log
      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }
      updateWeatherUI(data);
    })
    .catch(err => {
      console.error("Fetch Error:", err);
      alert("Something went wrong while fetching weather data.");
    });
}

function updateWeatherUI(data) {
  locationEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `Temperature: ${data.main.temp}°C`;
  descEl.textContent = `Description: ${data.weather[0].description}`;
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
  windEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Scroll effect on navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
