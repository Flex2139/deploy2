import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/use-api';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
	const data = await apiRequest('/api/auth/login', 'POST', credentials);
	localStorage.setItem('token', data.token);
	return data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
	const data = await apiRequest('/api/auth/register', 'POST', userData);
	localStorage.setItem('token', data.token);
	return data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: localStorage.getItem('token'),
		status: 'idle',
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
