const baseUrl = 'http://localhost:3030';

export const createPost = async (user, postContent) => {
    const response = await fetch(`${baseUrl}/data/posts`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': user.accessToken,
        },
        body: JSON.stringify({
            userImg: user.avatar,
            userFN: user.firstName,
            userLN: user.lastName,
            userUN: user.username,
            content: postContent,
        })
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getAllPosts = async () => {
    const response = await fetch(`${baseUrl}/data/posts`)

    const result = await response.json()

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}


export const getPost = async (authToken, postId) => {
    const response = await fetch(`${baseUrl}/data/posts/${postId}`, {
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': authToken,
        },
    })

    const result = await response.json()

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}
