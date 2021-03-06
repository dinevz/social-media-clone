const baseUrl = 'http://localhost:3030';

export const createProfile = async (user, accessToken) => {
    const response = await fetch(`${baseUrl}/data/profile`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            avatar: user.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            about: user.about,
        })
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}


export const getProfile = async (authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/profile?where=_ownerId%3D%22${userId}%22`, {
        headers: { 
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getMyComments = async (authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=_ownerId%3D%22${userId}%22&count`, {
        headers: { 
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getMyPosts = async (authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/posts?where=_ownerId%3D%22${userId}%22&count`, {
        headers: { 
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getMyCommentsCount = async (authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=_ownerId%3D%22${userId}%22&count`, {
        headers: { 
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const getMyPostsCount = async (authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/posts?where=_ownerId%3D%22${userId}%22&count`, {
        headers: { 
            'X-Authorization': authToken,
        },
    });
    const result = await response.json()
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}