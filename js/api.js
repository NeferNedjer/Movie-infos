import {CONFIG} from './config.js';
import {showCarouselMovies} from './ui.js'

const baseUrl = 'https://api.themoviedb.org/3';
const API_TOKEN = CONFIG.API_TOKEN;

function options(method) {
    return {
        method: method,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    }
}


export async function searchMovies(query) {
    const res = await fetch(`${baseUrl}/search/movie?api_key=${API_TOKEN}&query=${query}&language=fr-FR`,options('GET'));
    const data = await res.json();
    return data.results;
}

export async function getMovieDetails(movieId) {
    const res = await fetch(`${baseUrl}/movie/${movieId}?api_key=${API_TOKEN}&language=fr-FR&append_to_response=videos`,options('GET'));
    const data = await res.json();
    console.log(data);
    return data;
}

export async function getPopularMovies() {
    const res = await fetch(`${baseUrl}/movie/popular?api_key=${API_TOKEN}&language=fr-FR`, options('GET'));
    const data = await res.json();
    showCarouselMovies(data.results);
}

export async function getMovieVideos(movieId) {
    const res = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${API_TOKEN}&append_to_response=videos&language=fr-FR`, options('GET'));
    const data = res.json();
    return data.results;
}

export async function getGenres() {
    const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_TOKEN}&language=fr-FR`, options('GET'));
    const data = await res.json();
    return data.genres;
}

export async function getMoviesByGenres(genreId) {
    const res = await fetch(`${baseUrl}/discover/movie?api_key=${API_TOKEN}&with_genres=${genreId}&language=fr-FR`, options('GET'));
    const data = await res.json();
    return data.results;
}

