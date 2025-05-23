import { getPopularActors, getMovieCredits, getPopularMovies, getMoviesByActor } from "./api.js";
import { searchMovies } from "./api.js";
import {showCarouselMovies, showSuggestions, populateActorsSelect} from './ui.js';
import { getGenres, getMoviesByGenres, getSelection } from "./api.js";



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
    }, 100 );// delai anti-spam
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
let page = 1;

document.getElementById('style-select').addEventListener('change', async (e) => {
    const selection = e.target.value;
    page = 1;
    const movies = await getSelection(selection, page);
    showCarouselMovies(movies);
})

document.getElementById('nextPage').addEventListener('click', async () => {
    page++;
    const selection = document.getElementById('style-select').value;
    const movies = await getSelection(selection, page);
    showCarouselMovies(movies);
})

document.getElementById('previousPage').addEventListener('click', async () => {
    page--;
    const selection = document.getElementById('style-select').value;
    const movies = await getSelection(selection, page);
    showCarouselMovies(movies);
})

document.getElementById('genre-select').addEventListener('change', async (e) => {
    const genreId = e.target.value;
    if (genreId) {
        const movies = await getMoviesByGenres(genreId);
        showCarouselMovies(movies);
    }
})

document.getElementById("actor-select").addEventListener("change", async (e) => {
    const actorId = e.target.value;
    if (!actorId) return;
  
    const movies = await getMoviesByActor(actorId);
    showCarouselMovies(movies); 
  });



const arrow = document.querySelector("#arrow a");

arrow.addEventListener('click', (e) => {
    e.preventDefault();//empeche le comportement par default du lien (ne pas changer de page)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

async function init() {
    console.log(localStorage)
    // localStorage.clear();
    await getPopularMovies();
    await populateGenres();
    await populateActorsSelect()

}

init();
