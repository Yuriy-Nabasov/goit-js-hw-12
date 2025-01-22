`use strict`; // Код у суворому режимі

// Функції для HTTP-запитів

import axios from 'axios';

// ? Реалізація запитів за допомогою бібліотеки Axios та синктаксу async/await

export const fetchPhotoByQuery = (searchedQuery, page = 1) => {
  const searchParams = new URLSearchParams({
    key: `48208866-6baf83551ffafce9b15eedbf6`,
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 15,
  });
  return axios.get(`https://pixabay.com/api/?${searchParams}`);
};
