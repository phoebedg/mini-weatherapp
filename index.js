function getImage(weather) {
  fetch(
    `https://api.unsplash.com/search/photos?query=${weather}&client_id=70b32e7fb0f3151dc801ba5cb4a9f0ff0ed704984dce7970f6601e817ca9fcd7`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(imgData) {
      console.log("imgData:", imgData);
    })
    .catch(function(error) {
      alert("Use your imagination");
    });
}

function getWeather(city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1a957516dd5087c2380dee64cbacb905`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("weatherData:", data);
      const weather = data.weather[0].description;
      console.log("weather:", weather);
      return weather;
    })
    .then(function(weather) {
      getImage(weather);
    })
    .catch(function(error) {
      alert("Don't worry about the weather");
    });
}

getWeather("London");
