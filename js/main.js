import { getPopularMovies } from "./api.js";
import { searchMovies } from "./api.js";
import {showCarouselMovies, showSuggestions} from './ui.js';
import { getGenres, getMoviesByGenres } from "./api.js";



const searchInput = document.getElementById('searchInput');

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = e.target.value.trim();
        if (query.length > 1) {
            searchMovies(query).then(showSuggestions);
        } else {
            showSuggestions([]);// vide la liste
        }
    }, 300);// delai anti-spam
})

async function populateGenres() {
    const select =document.getElementById("genre-select");
    const genres = await getGenres();
    
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        select.appendChild(option);
    })
}

document.getElementById('genre-select').addEventListener('change', async (e) => {
    const genreId = e.target.value;
    if (genreId) {
        const movies = await getMoviesByGenres(genreId);
        showCarouselMovies(movies);
    }
})

const arrow = document.querySelector("#arrow a");

arrow.addEventListener('click', (e) => {
    e.preventDefault();//empeche le comportement par default du lien (ne pas changer de page)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

async function init() {
    
    await getPopularMovies();
    await populateGenres();  

}

init();
