import {configYouTube} from './config.js';

// const baseUrl = 'https://www.googleapis.com/youtube/v3/';
// const API_KEY = configYouTube.API_YouTube;

// function getYouTubeUrl(endpoint, params = {}) {
//     const url = new URL(`${baseUrl}${endpoint}`);
//     url.searchParams.set('key', API_KEY);

//     for (const [key, value] of Object.entries(params)) {
//         url.searchParams.set(key, value);
//     }

//     return url.toString();
// }

// export async function searchYouTube(query) {
//     const url = getYouTubeUrl('search', {
//         part: 'snippet',
//         type: 'video',
//         videoEmbeddable: 'true',
//         q: query,
//         maxResults: 50
//     });

//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         return data.items;
//     } catch (error) {
//         console.error('Erreur YouTube API : ', error);
//         return [];
//     }
// }

// export async function searchYouTube(query) {
//     let allResults = [];
//     let nextPageToken = ''; // Pour gérer la pagination
//     let hasMoreResults = true; // Flag pour savoir s'il y a d'autres pages de résultats à charger

//     while (hasMoreResults) {
//         // Appel à l'API YouTube pour la page actuelle
//         const url = getYouTubeUrl('search', {
//             part: 'snippet',
//             type: 'video',
//             videoEmbeddable: 'true',
//             q: query,
//             maxResults: 50,  // Limite à 50 par page
//             pageToken: nextPageToken  // Token pour récupérer la page suivante (si disponible)
//         });

//         try {
//             const response = await fetch(url);
//             const data = await response.json();

//             // Ajouter les résultats de la page courante aux résultats totaux
//             allResults = allResults.concat(data.items);

//             // Vérifier s'il y a une page suivante (pagination)
//             nextPageToken = data.nextPageToken;
//             hasMoreResults = !!nextPageToken;  // Si nextPageToken existe, il y a plus de résultats

//         } catch (error) {
//             console.error("Erreur lors de la récupération des vidéos YouTube", error);
//             hasMoreResults = false; // Si une erreur se produit, on arrête la boucle
//         }
//     }

//     return allResults;  // Retourner tous les résultats récupérés
// }

