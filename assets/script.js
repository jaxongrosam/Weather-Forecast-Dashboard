document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "5ee0f90324871a428363e7fb02fef1f8";
  const weatherDataContainer = document.getElementById("weatherData");
  const searchBtn = document.getElementById("fetchWeather");

  searchBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (city) {
      getWeatherData(city, apiKey);
    } else {
      alert("Please enter a city name.");
    }
  });

  function getWeatherData(city, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("weatherData", JSON.stringify(data));
        displayWeatherData(data);
      });
  }

  function displayWeatherData(data) {
    weatherDataContainer.innerHTML = "";
    data.list.forEach((item) => {
      const weatherInfo = document.createElement("p");
      weatherInfo.textContent = `Date: ${item.dt_txt}, Weather: ${item.weather[0].description}, Temperature: ${item.main.temp} K`;
      weatherDataContainer.appendChild(weatherInfo);
    });
  }

  const storedWeatherData = localStorage.getItem("weatherData");
  if (storedWeatherData) {
    const parsedData = JSON.parse(storedWeatherData);
    displayWeatherData(parsedData);
  }
});
