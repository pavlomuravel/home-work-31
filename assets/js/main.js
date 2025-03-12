
// #1 За допомогою ajax-запиту вивести погоду
//
// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19
// q=XXX - місто, для якого показати погоду

// Вводимо в інпут назву міста, натискаємо кнопку Погода
// Якщо таке місто не існує (404), виводимо напис, що таке місце не знайдено
// Якщо місто існує, виводимо наступну інформацію:
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки (виводимо картинку з таким урлом, як нам повернувся)
// http://openweathermap.org/img/w/10d.png

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5d066958a60d315387d9492393935c19";
  const searchInput = document.getElementById("searchCiti");
  const weatherContainer = document.querySelector(".weather__container");

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        fetchWeather(city);
      }
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
                <div class="weather__item-pressure">Тиск: ${pressure} гПа</div>
                <div class="weather__item-humidity">Вологість: ${humidity}%</div>
                <div class="weather__item-speed">Швидкість вітру: ${windSpeed} м/с</div>
                <div class="weather__item-deg">Напрям вітру: ${windDeg}°</div>
            </div>
            <div class="weather__text-description">${description}</div>
        `;
  }
});
