

const baseUrl = 'http://localhost:3030'

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
    if(response.ok) {
        return result;
    } else {
        throw result;
    }
}