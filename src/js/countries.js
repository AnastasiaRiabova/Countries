import countries from '../templates/countie.hbs';
import oneCountry from '../templates/oneCountry.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

require('lodash');
const enterCountrie = document.querySelector('#input');
enterCountrie.addEventListener(
  'input',
  _.debounce(() => {
    // console.log(enterCountrie.value);
    newMarkup();
  }, 500),
);

const countrieList = document.querySelector('#list');

function netCountrie() {
  if (enterCountrie.value.length !== 0) {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${enterCountrie.value}`,
    ).then(res => res.json());
  } else {
    countrieList.innerHTML = '';
  }
}

function newMarkup() {
  netCountrie().then(data => {
    const markup = countries(data);
    const oneCountryMarkup = oneCountry(data);
    if (data.length > 10) {
      error({
        title: 'Too many matches found. Please enter a more specific query!',
      });
    } else if (data.length > 1 && data.length < 10) {
      countrieList.innerHTML = markup;
    } else if (data.length === 1) {
      countrieList.innerHTML = oneCountryMarkup;
    }
  });
}

// function netCountrie() {
//   if (enterCountrie.value.length !== 0) {
//     fetch(`https://restcountries.eu/rest/v2/name/${enterCountrie.value}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const markup = countries(data);
//         const oneCountryMarkup = oneCountry(data);
//         if (data.length > 10) {
//           error({
//             title:
//               "Too many matches found. Please enter a more specific query!",
//           });
//         } else if (data.length > 1 && data.length < 10) {
//           countrieList.innerHTML = markup;
//         } else if (data.length === 1) {
//           countrieList.innerHTML = oneCountryMarkup;
//         }
//       });
//   } else {
//     countrieList.innerHTML = "";
//   }
// }
// let name = "sw";
