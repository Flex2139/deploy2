import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
	const auth = useAuth();

	const currentUser = auth?.currentUser ?? null;
	const token = auth?.token ?? localStorage.getItem('hotelToken') ?? null;

	const isAuthenticated = !!token;

	console.log('PrivateRoute — isAuthenticated:', isAuthenticated, 'user:', currentUser);

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
