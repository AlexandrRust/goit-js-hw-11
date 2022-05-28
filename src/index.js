import ApiServise from "./js/news-api"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    targetLode: document.querySelector('#target'),
    
}

const newApiServise = new ApiServise();


refs.form.addEventListener('submit', searchCard);


///____________________Function Search________________////

function searchCard(event) {
    event.preventDefault();
    const inputText = event.target.elements.searchQuery.value;

    if (inputText === "") {
        noImg()
    } else {
        newApiServise.query = inputText
    newApiServise.resetPage();
        newApiServise.axiosArticles().then(({ hits, totalHits , total }) => {
            if (total === 0) {
                noImg()
            } else {
                clearCard();
                checkImgTotal(hits, totalHits)
            }
            
        
    })
    }
    
    

}
    
    

//________________loade More________________________///

function loadeMore() {
    const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            newApiServise.axiosArticles().then(({ hits }) => {
                makeCard(hits)
    })
        }
    });
}
const options = {
    rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);
    observer.observe(refs.targetLode);
}

/////________________________S__________________/////

function lightbox() {
    const gallery = new SimpleLightbox('.photo-card a', { captionDelay: 250 });
    gallery.refresh();
}

/////////////////________________________Make Card_______________//////////

function makeCard(hits) {
    
    const card = hits.map((hit) => `<div class="photo-card" height = "190">
            <a class="gallery__item" href="${hit.largeImageURL}">
                <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="220" height="150"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${hit.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${hit.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${hit.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${hit.downloads}
                </p>
            </div>
        </div>`).join("");
    refs.gallery.insertAdjacentHTML('beforeend', card);
    lightbox()
};

///________________Clear Card_________________/////

function clearCard() {
    refs.gallery.innerHTML = "";
}


///__________________Chech imgTotal________/////

function checkImgTotal(hits, totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    makeCard(hits);
    loadeMore();
}

export function endImg() {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

export function noImg() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}




