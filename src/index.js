import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import countryTemplate from './template/country.hbs';
import countriesTemplate from './template/countries.hbs';
const debounce = require('lodash.debounce');

import '@pnotify/core/dist/BrightTheme.css';
import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  inputText: document.querySelector('.input-text-js'),
  countryCard: document.querySelector('.country-card'),
};

refs.inputText.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
  event.preventDefault();
  if (!event.target.value) {
    refs.countryCard.innerHTML = '';
    return;
  }
  const searchValue = event.target.value;
  fetchCountries(searchValue).then(getCountries).catch(errorMessage);
}

function createMarkupCountry(country) {
  country.map(country => {
    refs.countryCard.innerHTML = countryTemplate(country);
  });
}

function createMarkupCountries(countries) {
  const selectionOfCountries = countries.map(country => country.name);
  refs.countryCard.innerHTML = countriesTemplate(selectionOfCountries);
}

function getCountries(country) {
  if (country.length === 1) {
    createMarkupCountry(country);
  } else if (country.length >= 2 && country.length <= 10) {
    createMarkupCountries(country);
    refineRequestMessage();
  } else {
    errorMessage();
  }
}

function refineRequestMessage() {
  alert({
    text: 'Too many matches found. Please enter a more specific query.',
  });
}

function errorMessage() {
  error({
    text: 'Sorry, this country does not exist ',
  });
}
