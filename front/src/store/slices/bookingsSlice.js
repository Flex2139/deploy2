import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/use-api';

export const fetchBookings = createAsyncThunk(
	'bookings/fetchBookings',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth?.token || localStorage.getItem('token');
			if (!token) return rejectWithValue('Нет токена');
			return await apiRequest('/api/bookings', 'GET', null, token);
		} catch (err) {
			return rejectWithValue(err.message || String(err));
		}
	},
);

export const createBooking = createAsyncThunk(
	'bookings/createBooking',
	async (bookingData, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth?.token || localStorage.getItem('token');
			if (!token) return rejectWithValue('Нет токена');
			return await apiRequest('/api/bookings', 'POST', bookingData, token);
		} catch (err) {
			return rejectWithValue(err.message || String(err));
		}
	},
);

const bookingsSlice = createSlice({
	name: 'bookings',
	initialState: { items: [], status: 'idle', error: null },
	reducers: {
		clearBookings(state) {
			state.items = [];
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBookings.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchBookings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload || [];
			})
			.addCase(fetchBookings.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(createBooking.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(createBooking.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
