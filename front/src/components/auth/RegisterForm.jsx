import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../../store/slices/authSlice';
import Input from '../input/Input';
import Button from '../button/Button';

export default function RegisterForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}
		if (password.length < 5) {
			setError('Пароль должен содержать минимум 5 символов');
			return;
		}

		dispatch(registerSuccess({ email, password }));
		setError('');
		alert('Регистрация успешна!');
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="email"
				placeholder="Email"
				value={email}
				onChange={setEmail}
				required
			/>
			<Input
				type="password"
				placeholder="Пароль"
				value={password}
				onChange={setPassword}
				required
			/>
			<Input
				type="password"
				placeholder="Подтвердите пароль"
				value={confirmPassword}
				onChange={setConfirmPassword}
				required
			/>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<Button type="submit">Зарегистрироваться</Button>
		</form>
	);
}
