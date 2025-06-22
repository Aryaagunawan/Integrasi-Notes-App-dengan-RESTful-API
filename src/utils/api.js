const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const fetchWithToken = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson = await response.json();

        if (responseJson.status !== 'success') {
            throw new Error(responseJson.message);
        }

        return responseJson.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getActiveNotes = async () => {
    return fetchWithToken(`${BASE_URL}/notes`);
};

export const getArchivedNotes = async () => {
    return fetchWithToken(`${BASE_URL}/notes/archived`);
};

export const getNote = async (id) => {
    return fetchWithToken(`${BASE_URL}/notes/${id}`);
};

export const addNote = async ({ title, body }) => {
    return fetchWithToken(`${BASE_URL}/notes`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
    });
};

export const archiveNote = async (id) => {
    return fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
    });
};

export const unarchiveNote = async (id) => {
    return fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
    });
};

export const deleteNote = async (id) => {
    return fetchWithToken(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    });
};