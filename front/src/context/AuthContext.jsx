import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../hooks/use-api';

const TOKEN_KEY = 'token';
const USER_KEY = 'currentUser';

function getToken() {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}
function saveToken(t) {
	try {
		localStorage.setItem(TOKEN_KEY, t);
	} catch (err) {
		console.error(err);
	}
}

function removeToken() {
	try {
		localStorage.removeItem(TOKEN_KEY);
	} catch (err) {
		console.error(err);
	}
}

function getUser() {
	try {
		const raw = localStorage.getItem(USER_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function saveUser(u) {
	try {
		localStorage.setItem(USER_KEY, JSON.stringify(u));
	} catch (err) {
		console.error(err);
	}
}

function removeUser() {
	try {
		localStorage.removeItem(USER_KEY);
	} catch (err) {
		console.error(err);
	}
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setToken] = useState(() => getToken());
	const [currentUser, setCurrentUser] = useState(() => getUser());
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			const t = getToken();
			const u = getUser();

			if (t && !u) {
				try {
					const me = await apiRequest('/api/users/me', 'GET', null, t);
					setCurrentUser(me);
					saveUser(me);
					setToken(t);
				} catch (err) {
					console.warn('Auth init failed:', err);
					logout();
				}
			} else if (t && u) {
				setToken(t);
				setCurrentUser(u);
			}
			setLoading(false);
		};

		init();
	}, []);

	const login = (t, userObj) => {
		setToken(t);
		saveToken(t);
		if (userObj) {
			setCurrentUser(userObj);
			saveUser(userObj);
		}
	};

	const logout = () => {
		setToken(null);
		removeToken();
		setCurrentUser(null);
		removeUser();
	};

	return (
		<AuthContext.Provider value={{ token, currentUser, login, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
