// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../../hooks/use-api';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const submit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const { token, user } = await apiRequest('/api/auth/login', 'POST', {
				email,
				password,
			});
			login(token, user);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Ошибка входа');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mt-6">
			<div className="hero" style={{ gridTemplateColumns: '1fr' }}>
				<div className="hero-card" style={{ maxWidth: 720, margin: '0 auto' }}>
					<h1>Вход</h1>
					<form onSubmit={submit} style={{ marginTop: 18 }}>
						{error && (
							<div className="form-error" role="alert">
								{error}
							</div>
						)}

						<div>
							<label className="form-label">Email</label>
							<input
								className="form-field"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div style={{ marginTop: 10 }}>
							<label className="form-label">Пароль</label>
							<input
								className="form-field"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div style={{ marginTop: 16 }}>
							<button className="btn" type="submit" disabled={loading}>
								{loading ? 'Входим...' : 'Войти'}
							</button>
						</div>

						<div style={{ marginTop: 12 }} className="small muted">
							Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
