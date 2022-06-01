export const TOKEN_STORAGE_KEY = "tweet-bot-token";

export default function AuthenticationService(API_URL) {
    return {
        async authenticate(credentials) {
            const response = await fetch(`${API_URL}/auth`, {
                body: JSON.stringify(credentials),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            return response.json();
        },
        async checkAuthentication(token) {
            const response = await fetch(`${API_URL}/auth`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                method: 'GET'
            });

            return response.json();
        }
    }
}