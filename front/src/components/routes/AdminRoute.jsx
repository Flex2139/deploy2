import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
	const auth = useAuth();

	let user = auth?.currentUser ?? null;
	const token = auth?.token ?? localStorage.getItem('hotelToken') ?? null;
	const isAuthenticated = Boolean(token);

	if (!user) {
		const raw = localStorage.getItem('currentUser');
		if (raw) {
			try {
				user = JSON.parse(raw);
			} catch {
				user = null;
			}
		}
	}

	const isAdmin = Boolean(user?.isAdmin || user?.role === 'admin');

	if (!isAuthenticated) return <Navigate to="/login" replace />;
	if (!isAdmin) return <Navigate to="/" replace />;

	return <Outlet />;
};

export default AdminRoute;
