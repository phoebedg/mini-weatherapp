const form = document.querySelector("#search");
const input = document.querySelector("#search-tf");
const mainPhoto = document.querySelector("#photo");
const thumbnails = document.querySelector("#thumbs");

function createGallery(imgData) {
  console.log(imgData.results);
  const thumbs = imgData.results
    .map(function(pic) {
      return `<img src=${pic.urls.thumb}>`;
    })
    .join("");
  thumbnails.innerHTML = thumbs;
}

function createMainImg(imgData) {
  const img = imgData.results[0].urls.full;
  mainPhoto.innerHTML = `<img src =${img}>`;
  // const remainingImgs = imgData.results.shift();
}

function getImage(weather) {
  fetch(
    `https://api.unsplash.com/search/photos?query=${weather}&client_id=70b32e7fb0f3151dc801ba5cb4a9f0ff0ed704984dce7970f6601e817ca9fcd7`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(imgData) {
      // console.log("imgData:", imgData);
      createMainImg(imgData);
      createGallery(imgData);
    })
    .catch(function(error) {
      alert("Use your imagination");
    });
}

function getWeather(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log("weatherData:", data);
      const weather = data.weather[0].description;
      // console.log("weather:", weather);
      return weather;
    })
    .then(function(weather) {
      getImage(weather);
    })
    .catch(function(error) {
      alert("Don't worry about the weather");
    });
}

function submitForm(event) {
  event.preventDefault();
  const location = input.value;
  getWeather(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1a957516dd5087c2380dee64cbacb905`
  );
}

form.addEventListener("submit", submitForm);
