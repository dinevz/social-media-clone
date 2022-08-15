let baseUrl = 'https://upload.uploadcare.com/base/';


export const uploadFileService = async (file) => {
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            'content-type': 'multipart/form-data',
        },
        body: file,
    })

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw result;
    }
}