import {fetchPhoto} from "./components/fetchPhoto";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let lightbox = new SimpleLightbox('.gallery a');

const form = document.querySelector('#search-form')
const input = document.querySelector('input')
const gallery = document.querySelector('.gallery')
const btn = document.querySelector('.load-more')
const btnSearch = document.querySelector('form button')
btnSearch.setAttribute('disabled', true)

btnNone()
let page = 1
let inputValue
let totalHits

form.addEventListener('submit', onFormSubmit)
btn.addEventListener('click', onClickBtn)
input.addEventListener('input', onInput)



function onInput(){ // disablet кнопки поиска
  console.log(input.value.trim().length)
  if(input.value.trim().length >= 1){
    btnSearch.removeAttribute('disabled')
    return
  }
  
}


// clearTextContent()
function onClickBtn(){
  fetch()
  
}


function fetch(){
  fetchPhoto(input.value, page).then(image => {  // мап картинок с бэка.
    console.log(image.totalHits);
    totalHits = image.totalHits
    
    if(page === 1 && input.value !== 0){
      Notify.success(`Hooray! We found ${totalHits} images.`)
      
    }
    if (image.total === 0) { // если пришло 0 картинок, то это
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      return;
    }
    
    if(image.hits.length < 40){ // если картинки закончились, то появляется кнопка
      btnNone()
      Notify.warning("We're sorry, but you've reached the end of search results.")
      return
    }
    
    
    
    btnBlock()
    page += 1
    image.hits.map((el) => {
        const markup = markupCard(el)
        
        renderCard(markup) // вызов функции рендера страницы
        lightbox.refresh();
    })
    btnBlock()
    
})
.catch(error =>{
  console.log(error)
})
}



function onFormSubmit(evt){
  inputValue = input.value.trim()
  
  
  if(inputValue === ''){
  return;
  } 
  evt.preventDefault() 
  pageOne()
  fetch()
  
  clearTextContent()
  
  }
  
  



function renderCard(markup){ // функци рендера
    gallery.insertAdjacentHTML('beforeend', markup)
}


// функция появления и пропадание кнопки lead-more
function btnNone(){
    btn.classList.add('is-hidden')
}
function btnBlock(){
    btn.classList.remove('is-hidden')
}
////////////////////////////////////////////////

function pageOne(){
  page = 1
}

function clearTextContent(){
  gallery.innerHTML = ' ';
  
}

function markupCard({webformatURL,largeImageURL,tags,likes,views,comments,downloads}){
    return `
    <div class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class="gallery__image" loading="lazy" />
  <div class="info">
    <p class="info-item">
    <svg fill="ffffff" xmlns="http://www.w3.org/2000/svg">
<path wigth="50" height="50" d="M15.999 30.318c-31.214-17.028-8.639-38.197 0-23.94 8.641-14.257 31.217 6.912 0 23.94z"/>
</svg>
      <b>${likes}</b>
    </p>
    <p class="info-item">
    <svg fill="ffffff" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.879 15.443c-2.621-5.695-8.545-11.443-15.879-11.443s-13.257 5.748-15.879 11.443c-0.076 0.164-0.121 0.355-0.121 0.557s0.045 0.394 0.124 0.566l-0.003-0.008c2.621 5.695 8.545 11.443 15.879 11.443s13.257-5.748 15.879-11.443c0.076-0.164 0.121-0.355 0.121-0.557s-0.045-0.394-0.124-0.566l0.003 0.008zM16 25.333c-5.881 0-10.861-4.736-13.187-9.333 2.325-4.597 7.305-9.333 13.187-9.333s10.861 4.736 13.187 9.333c-2.325 4.597-7.305 9.333-13.187 9.333z"></path>
    <path d="M16 9.333c-3.682 0-6.667 2.985-6.667 6.667s2.985 6.667 6.667 6.667c3.682 0 6.667-2.985 6.667-6.667v0c-0.005-3.68-2.987-6.662-6.666-6.667h-0zM16 20c-2.209 0-4-1.791-4-4s1.791-4 4-4c2.209 0 4 1.791 4 4v0c0 2.209-1.791 4-4 4v0z"></path>
</svg>
      <b>${views}</b>
    </p>
    <p class="info-item">
    <svg fill="ffffff" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.064 2.88h15.872c3.712 0 6.784 3.072 6.784 6.784v5.504c0 3.712-3.072 6.784-6.784 6.784h-6.848l-6.656 6.656c-0.064 0-0.64 0.704-1.408 0.448-0.512-0.128-0.832-0.576-0.832-1.088v-6.016c-3.84 0-6.912-2.944-6.912-6.784v-5.504c0-3.712 3.072-6.784 6.784-6.784zM7.744 16.96c-0.384 0-0.64-0.256-0.64-0.64s0.256-0.64 0.64-0.64h9.152c0.384 0 0.64 0.256 0.64 0.64s-0.256 0.64-0.64 0.64h-9.152zM7.744 13.312c-0.384 0-0.64-0.32-0.64-0.64 0-0.384 0.256-0.64 0.64-0.64h16.512c0.384 0 0.64 0.256 0.64 0.64 0 0.32-0.256 0.64-0.64 0.64h-16.512zM7.744 9.6c-0.384 0-0.64-0.256-0.64-0.64s0.256-0.64 0.64-0.64h13.248c0.32 0 0.64 0.256 0.64 0.64s-0.32 0.64-0.64 0.64h-13.248zM23.936 4.672h-15.872c-2.752 0-4.992 2.24-4.992 4.992v5.504c0 2.752 2.24 4.992 4.992 4.992h0.32c0.832 0 1.6 0.768 1.6 1.6v4.736l6.336-6.336h7.616c2.752 0 4.992-2.24 4.992-4.992v-5.504c0-2.752-2.24-4.992-4.992-4.992z"></path>
</svg>
      <b>${comments}</b>
    </p>
    <p class="info-item">
    <svg fill="ffffff" xmlns="http://www.w3.org/2000/svg">
<path d="M30.608 17.358c-0.928-1.161-2.114-1.914-3.558-2.258 0.456-0.689 0.683-1.456 0.683-2.3 0-1.178-0.417-2.183-1.25-3.017s-1.839-1.25-3.017-1.25c-1.056 0-1.978 0.344-2.766 1.033-0.655-1.6-1.703-2.883-3.142-3.85s-3.025-1.45-4.758-1.45c-2.355 0-4.367 0.834-6.033 2.5s-2.5 3.678-2.5 6.033c0 0.144 0.011 0.383 0.033 0.717-1.311 0.611-2.355 1.528-3.133 2.75s-1.167 2.555-1.167 4c0 2.056 0.731 3.814 2.192 5.275s3.219 2.192 5.275 2.192h18.134c1.766 0 3.275-0.625 4.525-1.875s1.875-2.758 1.875-4.525c-0-1.489-0.464-2.814-1.392-3.975zM21.167 18l-5.85 5.85c-0.1 0.1-0.228 0.15-0.383 0.15s-0.283-0.050-0.383-0.15l-5.867-5.867c-0.1-0.1-0.15-0.228-0.15-0.383 0-0.144 0.053-0.269 0.158-0.375s0.231-0.158 0.375-0.158h3.733v-5.867c0-0.144 0.053-0.269 0.158-0.375s0.231-0.158 0.375-0.158h3.2c0.145 0 0.269 0.053 0.375 0.158s0.158 0.231 0.158 0.375v5.867h3.733c0.156 0 0.283 0.050 0.383 0.15s0.15 0.228 0.15 0.383c0 0.134-0.055 0.267-0.166 0.4z"/>
</svg>
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>
`
}




