
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5d066958a60d315387d9492393935c19";
  const searchInput = document.getElementById("searchCiti");
  const weatherContainer = document.querySelector(".weather__container");

  function debounce(callback, wait) {
    let timer;
    return function(...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        callback(...args);
      }, wait);
    };
  }

  const fetchWeatherDebounced = debounce(fetchWeather, 500);

  searchInput.addEventListener("input", function () {
    const city = searchInput.value.trim();
    if (city) {
      fetchWeatherDebounced(city);
    }
  });

  function fetchWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&APPID=${apiKey}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          updateWeatherUI(data);
        } else {
          weatherContainer.innerHTML = `<h2>Місто не знайдено</h2>`;
        }
      }
    };
    xhr.send();
  }

  function updateWeatherUI(data) {
    const cityName = data.name;
    const temp = data.main.temp;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const windDeg = data.wind.deg;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = `
            <div class="weather__citi">
                <h1>${cityName}</h1>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather">
            </div>
            <div class="weather__temp">Температура: ${temp}°C</div>
            <div class="weather__item">
                <div class="weather__item-pressure">${pressure} гПа</div>
                <div class="weather__item-humidity">${humidity}%</div>
                <div class="weather__item-speed">${windSpeed} м/с</div>
                <div class="weather__item-deg">${windDeg}°</div>
            </div>
            <div class="weather__text-description">${description}</div>
        `;
  }
});
