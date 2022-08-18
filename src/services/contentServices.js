const baseUrl = 'https://postterr.herokuapp.com';

export const createPost = async (user, postContent, postMedia) => {
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
            media: postMedia,
        })
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const editPost = async (accessToken, postID, post) => {
    const response = await fetch(`${baseUrl}/data/posts/${postID}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            userImg: post.userImg,
            userFN: post.userFN,
            userLN: post.userLN,
            userUN: post.userUN,
            content: post.content,
            media: post.media,
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


export const getPost = async (postId) => {
    const response = await fetch(`${baseUrl}/data/posts/${postId}`, {
        headers: {
            'Content-type': 'application/json',
        },
    })

    const result = await response.json()

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const deletePost = async (postId, accessToken) => {
    const response = await fetch(`${baseUrl}/data/posts/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': accessToken,
        },
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}
