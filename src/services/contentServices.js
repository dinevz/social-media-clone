const baseUrl = 'http://localhost:3030';

export const createPost = async (user, postContent) => {
    const response = await fetch(`${baseUrl}/data/posts`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': user.authToken,
        },
        body: JSON.stringify({
            userImg: user.imageUrl,
            userFN: user.firstName,
            userLN: user.lastName,
            userUN: user.username,
            content: postContent,
        })
    })

    const result = await response.json();

    if(response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getAllPosts = async () => {
    const response = await fetch(`${baseUrl}/data/posts`)

    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getProfile = async (authToken) => {
    const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if(response.ok) {
        delete result["password"];
        return result;
    } else {
        throw result;
    }
}
