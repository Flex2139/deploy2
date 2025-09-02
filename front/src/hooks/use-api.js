export async function apiRequest(path, method = 'GET', body = null, token = null) {
	const base = import.meta.env.VITE_API_URL || '';
	const url = `${base}${path}`;

	const headers = { 'Content-Type': 'application/json' };
	if (token) headers.Authorization = `Bearer ${token}`;

	const res = await fetch(url, {
		method,
		headers,
		body: body ? JSON.stringify(body) : null,
	});

	if (!res.ok) {
		let errMsg = 'Ошибка запроса';
		try {
			const e = await res.json();
			if (e?.message) errMsg = e.message;
		} catch {
			// ignore
		}
		throw new Error(errMsg);
	}

	if (res.status === 204) return null;
	return res.json();
}
