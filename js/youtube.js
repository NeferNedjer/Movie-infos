import { searchYouTube } from "./youtubeApi.js";

const gallery = document.getElementById('video-gallery');
const detail = document.getElementById('video-detail');
const player = document.getElementById('video-player');
const title = document.getElementById('video-title');
const description =document.getElementById('video-description');
const contentTypeSelect = document.getElementById('content-type');
let pageHistory = [];
let nextPageToken = null;

async function displayVideos(query, token = "") {
    const data = await searchYouTube(query, token);
    const videos = data.items;

    gallery.innerHTML = '';
    
    videos.forEach(video => {
        const vidId = video.id.videoId;
        const thumb = video.snippet.thumbnails.medium.url;
        const videoTitle = video.snippet.title;

        const div = document.createElement('div');
        div.classList.add('thumb');
        div.innerHTML = `
        <img src="${thumb}" alt="${videoTitle}">
        <p>${videoTitle}<p>
        `;

        div.addEventListener('click', () => {
            title.textContent = videoTitle;
            description.textContent = video.snippet.description;
            player.innerHTML = `
            <iframe width="640" height="480" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
            `;
            detail.classList.remove('hidden');
            detail.scrollIntoView({behavior: "smooth"});
        });
        gallery.appendChild(div);
    });

    if (token && !pageHistory.includes(token)) {
        pageHistory.push(token);
    }

    nextPageToken = data.nextPageToken || null

    document.getElementById("prevBtn").disabled = pageHistory.length <= 1;
    document.getElementById("nextBtn").disabled = !nextPageToken;

}

contentTypeSelect.addEventListener('change', (event) => {
    const selectedType = event.target.value;
    displayVideos(selectedType);
    
})

const arrow = document.querySelector("#arrow a");

arrow.addEventListener('click', (e) => {
    e.preventDefault();//empeche le comportement par default du lien (ne pas changer de page)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

pageHistory = [""];
displayVideos(contentTypeSelect.value);
console.log("Historique des pages :", pageHistory);


document.getElementById("nextBtn").addEventListener('click', () => {
    if (nextPageToken) {
        displayVideos(contentTypeSelect.value, nextPageToken);
    }
})

document.getElementById('prevBtn').addEventListener('click', () => {
    if (pageHistory.length > 1 ) {
        pageHistory.pop();
        const previousToken = pageHistory[pageHistory.length - 1];
        const currentQuery = contentTypeSelect.value;
        displayVideos(currentQuery, previousToken);
    } else {
        console.log("Pas de page précédante");
    }
});