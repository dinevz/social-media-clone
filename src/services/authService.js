const baseUrl = 'https://postterr.herokuapp.com';

export const login = async (email, password) => {
    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });

    const result = await response.json();
    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}

export const register = async (email, password) => {
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    if (response.status !== 200) {
        throw response
    } else {
        const result = await response.json();
        if (response.ok) {
            delete result["password"];
            return result;
        } else {
            throw result;
        }
    }
}


export const logout = async (authToken) => await fetch(`${baseUrl}/users/logout`, { headers: { 'X-Authorization': authToken, }, });


