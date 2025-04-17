import {configYouTube} from './config.js';

const baseUrl = 'https://www.googleapis.com/youtube/v3/';
const API_KEY = configYouTube.API_YouTube;
const maxResults = 10;

function getYouTubeUrl(endpoint, params = {}) {
    const url = new URL(`${baseUrl}${endpoint}`);
    url.searchParams.set('key', API_KEY);

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    return url.toString();
}

export async function searchYouTube(query, pageToken = "") {
    const url = getYouTubeUrl('search', {
        part: 'snippet',
        type: 'video',
        videoEmbeddable: 'true',
        q: query,
        maxResults: 10,
        ...(pageToken && {pageToken})
    });

    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Erreur YouTube API : ', error);
        return { items: [] };
    }
}



