'use strict';
const countriesContainer = document.querySelector('.countries');

const renderCity = function (data) {
  const html = `<article class="country">
  <div class="country__data">
  <h3 class="country__name">City: ${data.city}</h3>
    <h4 class="country__region">Region: ${data.region}</h4>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${+(
      data.population / 1000000
    ).toFixed(1)}</p>
    // <p class="country__row"><span>🗣️</span>${
      data.languages[0].name
    }</p>
    // <p class="country__row"><span>💰</span>${
      data.currencies[0].name
    }</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => {
      if (!res.ok)
        throw new Error(`Problem with geocodig ${res.status}`);
      return res.json();
    })
    .then((data) => {
      renderCity(data);
      return fetch(
        `https://restcountries.com/v2/name/${data.country}`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found. ${response.status}`);
      return response.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      console.error(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

// whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
