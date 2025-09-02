import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
		checkIn: { type: Date, required: true },
		checkOut: { type: Date, required: true },
		guests: { type: Number, default: 1 },
		status: {
			type: String,
			enum: ['created', 'confirmed', 'cancelled'],
			default: 'created',
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Booking', bookingSchema);
