const baseUrl = 'https://postterr.herokuapp.com';

export const like = async (postId, username, type, accessToken) => {
    const response = await fetch(`${baseUrl}/data/likes`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            postId: postId,
            username,
            type,
        })
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const dislike = async (postId, accessToken) => {
    const response = await fetch(`${baseUrl}/data/likes/${postId}`, {
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


export const getMyLikes = async (userId) => {
    const response = await fetch(`${baseUrl}/data/likes?where=_ownerId%3D%22${userId}%22`, {
        headers: { 
            'Content-type': 'application/json',
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getLikesCount = async (postId) => {
    const response = await fetch(`${baseUrl}/data/likes?where=postId%3D%22${postId}%22&distinct=_ownerId&count`, {
        headers: { 
            'Content-type': 'application/json',
        },
    });

    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getIsLiked = async (postId) => {
    const response = await fetch(`${baseUrl}/data/likes?where=postId%3D%22${postId}%22`, {
        headers: { 
            'Content-type': 'application/json',
        },
    });

    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getLikesByUser = async (userId) => {
    const response = await fetch(`${baseUrl}/data/likes?where=_ownerId%3D%22${userId}%22`, {
        headers: { 
            'Content-type': 'application/json',
        },
    });

    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}