import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import roomsRoutes from './routes/rooms.js';
import bookingRoutes from './routes/bookings.js';
import usersRoutes from './routes/users.js';

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));
app.get('/', (req, res) =>
	res.send('Backend for Отель "Жемчужина Байкала" — API at /api/*'),
);

app.use('/api', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api', bookingRoutes);
app.use('/api/users', usersRoutes);

if (process.env.ENABLE_SEED === 'true') {
	import('./routes/dev.js')
		.then((mod) => {
			const devRoutes = mod.default || mod;
			app.use('/api/dev', devRoutes);
			console.log('⚙️  Dev routes enabled (mounted asynchronously)');
		})
		.catch((err) => {
			console.warn('⚠️  Could not load dev routes:', err.message || err);
		});
}

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

export default app;
