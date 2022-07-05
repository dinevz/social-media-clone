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

    return result
}

export const getAllPosts = async () => {
    const response = await fetch(`${baseUrl}/data/posts`)

    const result = await response.json()

    return result
}