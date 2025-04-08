import { getMovieDetails } from "./api.js";
import { getPopularMovies } from "./api.js";
import { getMovieVideos } from "./api.js";



export function showLoader() {
    document.querySelector("#loader").style.display = "block";
}

export function hideLoader() {
    document.querySelector("#loader").style.display = "none";
}

export function showSuggestions(movies) {
    const suggestionBox = document.getElementById('suggestions');
    suggestionBox.innerHTML = "";

    if (movies.length === 0) {
        suggestionBox.style.display = "none";
        return;
    }

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.addEventListener('click', async () => {
            const details = await getMovieDetails(movie.id);
            showMovieDetails(details);
            suggestionBox.style.display = "none";
        });
        suggestionBox.appendChild(li);
    });
    suggestionBox.style.display = 'block';
}

export async function showMovieDetails(movie) {
    const detailSection = document.getElementById('movie-details');
    const videos = await getMovieVideos(movie.id);
    const trailer = movie.videos?.results?.find(video => video.type === 'Trailer' && video.site === "YouTube");
    detailSection.innerHTML = `
    <div id="details-container">
        
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <p><strong>Synopsis : </strong> ${movie.overview}</p>
        <p><strong>Note : </strong> ${movie.vote_average} / 10</p>
        <p><strong>Date de sortie : </strong> ${movie.release_date}</p>

        ${trailer ? `
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}"  title="${trailer.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;   picture-in-picture" allowfullscreen>
            </iframe>
        </div>` : "<P> Aucune bande-annonce disponible...</p>"}
    </div>
    `;
    detailSection.style.display = "flex";
}


export function showCarouselMovies(movies) {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = ''; // reset le carousel

    // Fonction utilitaire pour créer une image avec un listener
    const createMovieImage = (movie) => {
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        img.alt = movie.title;
        img.style.cursor = "pointer"; // petit bonus UX
        img.addEventListener("click", async () => {
            const details = await getMovieDetails(movie.id);
            showMovieDetails(details);
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
        return img;
    };

    // Première série d’images
    movies.forEach(movie => {
        const img = createMovieImage(movie);
        carousel.appendChild(img);
    });

    // Deuxième série (copie pour boucle infinie)
    movies.forEach(movie => {
        const img = createMovieImage(movie);
        img.alt += " (copie)";
        carousel.appendChild(img);
    });
}


document.querySelector('.next').addEventListener('click', () => {
    moveCarousel('next');
})

document.querySelector('.prev').addEventListener('click', () => {
    moveCarousel('prev');
})



