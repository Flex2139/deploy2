import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roomsReducer from './slices/roomsSlice';
import bookingsReducer from './slices/bookingsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		rooms: roomsReducer,
		bookings: bookingsReducer,
	},
});

export { store };
export default store;
