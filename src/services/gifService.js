const API_KEY = '7quLCkSUarQTGKMgC99crJf1Nbd159KY'

export const getTrendingGifs = async (offset) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=15&offset=${offset}&rating=g`)

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const searchGif = async (query) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=15&offset=0&rating=g&lang=en`)

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

