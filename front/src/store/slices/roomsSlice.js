import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../hooks/use-api';

export const fetchRooms = createAsyncThunk(
	'rooms/fetchRooms',
	async (_, { rejectWithValue }) => {
		try {
			const data = await apiRequest('/api/rooms', 'GET');
			return data;
		} catch (err) {
			return rejectWithValue(err.message || String(err));
		}
	},
);

export const deleteRoom = createAsyncThunk(
	'rooms/deleteRoom',
	async (roomId, { rejectWithValue }) => {
		try {
			await apiRequest(`/api/rooms/${roomId}`, 'DELETE');
			return roomId;
		} catch (err) {
			return rejectWithValue(err.message || String(err));
		}
	},
);

export const updateRoom = createAsyncThunk(
	'rooms/updateRoom',
	async ({ roomId, updatedData }, { rejectWithValue }) => {
		try {
			const updatedRoom = await apiRequest(
				`/api/rooms/${roomId}`,
				'PUT',
				updatedData,
			);
			return updatedRoom;
		} catch (err) {
			return rejectWithValue(err.message || String(err));
		}
	},
);

const normalizeRoom = (r) => {
	const id = r._id ?? r.id ?? String(r.slug || Math.random());
	return { ...r, id, _id: r._id ?? id };
};

const roomsSlice = createSlice({
	name: 'rooms',
	initialState: { data: [], items: [], status: 'idle', error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRooms.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchRooms.fulfilled, (state, action) => {
				const arr = (action.payload || []).map(normalizeRoom);
				state.data = arr;
				state.items = arr; // обратная совместимость
				state.status = 'succeeded';
			})
			.addCase(fetchRooms.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(deleteRoom.fulfilled, (state, action) => {
				state.data = state.data.filter((room) => room.id !== action.payload);
				state.items = state.items.filter((room) => room.id !== action.payload);
			})

			.addCase(updateRoom.fulfilled, (state, action) => {
				const updated = normalizeRoom(action.payload);
				state.data = state.data.map((room) =>
					room.id === updated.id ? updated : room,
				);
				state.items = state.items.map((room) =>
					room.id === updated.id ? updated : room,
				);
			});
	},
});

export default roomsSlice.reducer;
