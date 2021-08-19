const API_KEY = "2dcf53ef5b6a834335bbdb19dadf3442";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
    const request = await fetch(`${API_BASE}${endpoint}`);
    const json = await request.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug : "originals",
                title : "Originais do Netflix",
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : "trending",
                title : "Recomendados",
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : "toprated",
                title : "Em destaque",
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : "action",
                title : "Ação",
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : "comedy",
                title : "Comédia",
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            }
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if ( movieId ) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    break;  
            }
        }

        return info;
    }
}