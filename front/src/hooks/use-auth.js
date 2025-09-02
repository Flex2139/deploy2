import { useSelector } from 'react-redux';

export function useAuth() {
	const { isAuth, user } = useSelector((state) => state.auth);

	return {
		isAuth,
		user,
		isAdmin: user?.role === 'admin',
	};
}
