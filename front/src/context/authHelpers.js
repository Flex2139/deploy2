export const TOKEN_KEY = 'baikal_token_v1';
export const USER_KEY = 'baikal_user_v1';

export function saveToken(token) {
	if (!token) return;
	localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
	localStorage.removeItem(TOKEN_KEY);
}

export function saveUser(user) {
	if (!user) return;
	try {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	} catch {
		// intentionally ignored
	}
}

export function getUser() {
	try {
		const s = localStorage.getItem(USER_KEY);
		return s ? JSON.parse(s) : null;
	} catch {
		return null;
	}
}

export function removeUser() {
	localStorage.removeItem(USER_KEY);
}
