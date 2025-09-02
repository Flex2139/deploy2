import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import Input from '../input/Input';
import Button from '../button/Button';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			loginSuccess({
				user: { email, role: 'user' },
				token: 'fake-jwt-token',
			}),
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input type="email" placeholder="Email" value={email} onChange={setEmail} />
			<Input
				type="password"
				placeholder="Пароль"
				value={password}
				onChange={setPassword}
			/>
			<Button type="submit">Войти</Button>
		</form>
	);
}
