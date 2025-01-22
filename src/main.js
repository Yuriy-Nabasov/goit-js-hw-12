`use strict`; // Код у суворому режимі

// Підключаємо бібліотеки
import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css'; // Стилі iziToast підключив через імпорт в styles.css
import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css'; // Стилі iziToast підключив через імпорт в styles.css

// Підключаємо функції
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotoByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

const loadMoreBtn = document.querySelector('.js-load-more-btn');
let searchedQuery = ''; // Глобальна змінна для збереження ключового слова
let page = 1;
const perPage = 15;

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true, // Включити підписи
  captionsData: 'alt', // Джерело підпису: атрибут alt
  captionDelay: 250, // Затримка перед відображенням підпису
  animationSpeed: 300, // Швидкість анімації
  overlayOpacity: 0.8, // Прозорість фону
});

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    const inputQuery = event.currentTarget.elements.user_query.value.trim();

    if (inputQuery === '') {
      iziToast.error({
        title: 'Error',
        message: `❌ Поле має бути заповнено!`,
        position: 'topRight',
      });

      return;
    }
    if (inputQuery !== searchedQuery) {
      searchedQuery = inputQuery;
      page = 1; // Скидаємо номер сторінки
      galleryEl.innerHTML = ''; // Очищуємо галерею
      loadMoreBtn.style.display = 'none'; // Ховаємо кнопку
    }
    loaderEl.style.display = 'block'; // Показуємо індикатор завантаження

    const response = await fetchPhotoByQuery(searchedQuery, page);

    loaderEl.style.display = 'none'; // Ховаємо індикатор завантаження

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });

      return;
    }

    renderGallery(response.data.hits);
    iziToast.success({
      title: 'Success',
      message: `🎉 Found ${response.data.totalHits} images!`,
      position: 'topRight',
    });

    if (response.data.totalHits > perPage) {
      loadMoreBtn.style.display = 'block'; // Показуємо кнопку
    }
  } catch (err) {
    loaderEl.style.display = 'none'; // Ховаємо індикатор завантаження
    iziToast.error({
      title: 'Error',
      message: '❌ Something went wrong. Please try again.',
      position: 'topRight',
    });
    console.log(err);
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    page += 1; // Збільшуємо номер сторінки
    loaderEl.style.display = 'block'; // Показуємо індикатор завантаження
    loadMoreBtn.style.display = 'none'; // Тимчасово ховаємо кнопку

    const response = await fetchPhotoByQuery(searchedQuery, page);

    loaderEl.style.display = 'none';
    if (response.data.hits.length === 0) {
      iziToast.info({
        title: 'End',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none'; // Ховаємо кнопку
      return;
    }

    renderGallery(response.data.hits);

    if (page * perPage >= response.data.totalHits) {
      iziToast.info({
        title: 'End',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block'; // Повертаємо кнопку
    }

    // Прокрутка сторінки
    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    loaderEl.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `❌ Something went wrong. Please try again.`,
      position: 'topRight',
    });
    console.error(err);
  }
};

const renderGallery = images => {
  const galleryTemplate = images.map(createGalleryCardTemplate).join('');
  galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
  lightbox.refresh(); // Оновлюємо SimpleLightbox
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
