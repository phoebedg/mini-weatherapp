const form = document.querySelector("#search");
const input = document.querySelector("#search-tf");
const mainPhoto = document.querySelector("#photo");
const thumbs = document.querySelector("#thumbs");
const info = document.querySelector("#info");

function createGallery(imgData) {
  thumbs.innerHTML = imgData.results
    .map(function(pic) {
      return `
        <a class="thumbs__link"
          href="${pic.urls.regular}" 
          data-image="${pic.urls.full}" 
          data-creator="${pic.user.name}" 
          data-creator-website="${pic.user.links.html}"
          data-bgcolor="${pic.color}">
          <img class="thumbs__link__img" src="${pic.urls.thumb}">
        </a>`;
    })
    .join("");
}

function createMainImg(imgData) {
  const img = imgData.results[0].urls.regular;
  mainPhoto.innerHTML = `<img id="mainImg" src =${img}>`;
  document.body.style.backgroundColor = `${imgData.results[0].color}`;
}

function getImage(weather) {
  fetch(
    `https://api.unsplash.com/search/photos?query=${weather}&client_id=70b32e7fb0f3151dc801ba5cb4a9f0ff0ed704984dce7970f6601e817ca9fcd7`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(imgData) {
      createMainImg(imgData);
      createGallery(imgData);
    })
    .catch(function(error) {
      alert("Use your imagination");
    });
}

function getWeather(url) {
  function getDescription(data) {
    return data.weather[0].description;
  }
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(getDescription)
    .then(getImage)
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

function swapImage(event) {
  event.preventDefault();
  mainPhoto.innerHTML = `<img src="${event.target.dataset.image}">`;
  info.innerHTML = `
  <a href="${event.target.dataset.creatorWebsite}"
  target="_blank" 
  id="credit-user">${event.target.dataset.creator}
  </a>
  <span>on</span>
  <a href="#" 
  id="credit-platform">Unsplash
  </a>`;
  document.body.style.backgroundColor = `${event.target.dataset.bgcolor}`;
}

form.addEventListener("submit", submitForm);
thumbs.addEventListener("click", swapImage);
