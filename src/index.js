import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', onLoadMoreBtn);
form.addEventListener('submit', userData);

let inputData = '';
let page = 0;
loadMoreBtn.style.display = 'none';

function userData(event) {
  event.preventDefault();
  inputData = input.value;
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'block';
  getData(inputData);
}

async function getData(dataUser) {
  const url = `https://pixabay.com/api/?key=28142937-a3dfb3cd180998f959efa9eff&q=${dataUser}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  try {
    const response = await axios.get(url);
    const dataImages = response.data.hits;
    if (dataImages.length === 0) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (dataImages.length < 40) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          'Were sorry, but youve reached the end of search results.'
        );
      }
      renderList(dataImages);
    }
  } catch (error) {
    console.log('gopa');
    console.error(error);
  }
}

function renderList(dataImages) {
  const markup = dataImages
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoadMoreBtn(event) {
  event.preventDefault();
  page += 1;
  getData(inputData);
}
