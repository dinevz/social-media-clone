
export const getNews = async (query) => {
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/news/search?q=${query}`, {
        method: "GET",
        headers: {
            'Ocp-Apim-Subscription-Key': 'fb512d1aeca4438c82fce2354ccfdac2',
        },
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}