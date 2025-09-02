import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import RoomsPage from './pages/rooms/RoomsPage';
import RoomDetailsPage from './pages/rooms/RoomDetailsPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import Layout from './components/layout/Layout';
import ProfilePage from './pages/profile/ProfilePage';
import GalleryPage from './pages/gallery/GalleryPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ServicesPage from './pages/services/ServicesPage';
import Loader from './components/loader/Loader';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const LOAD_DELAY = 3000;

	useEffect(() => {
		const t = setTimeout(() => setIsLoading(false), LOAD_DELAY);
		return () => clearTimeout(t);
	}, [LOAD_DELAY]);

	if (isLoading) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'var(--app-bg, #fff)',
				}}
			>
				<Loader size={72} label="Загрузка..." />
			</div>
		);
	}
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/rooms" element={<RoomsPage />} />
				<Route path="/rooms/:id" element={<RoomDetailsPage />} />
				<Route path="/gallery" element={<GalleryPage />} />
				<Route path="/reviews" element={<ReviewsPage />} />
				<Route path="/services" element={<ServicesPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route element={<PrivateRoute />}>
					<Route path="/my-bookings" element={<MyBookingsPage />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Route>

				<Route element={<AdminRoute />}>
					<Route path="/admin" element={<AdminPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Layout>
	);
}
