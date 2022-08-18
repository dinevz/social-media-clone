const baseUrl = 'https://postterr.herokuapp.com';

export const createComment = async (postId, content, commentMedia, accessToken) => {
    const response = await fetch(`${baseUrl}/data/comments`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': accessToken,
        },
        body: JSON.stringify({
            postId: postId,
            content: content,
            media: commentMedia,
        })
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}


export const getComments = async (postId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=postId%3D%22${postId}%22`, {
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

export const getCommentCount = async (postId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=postId%3D%22${postId}%22&count`, {
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

export const deleteComment = async (commentId, accessToken) => {
    const response = await fetch(`${baseUrl}/data/comments/${commentId}`, {
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
