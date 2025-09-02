import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import seedOnStart from './config/seedOnStart.js';
import authRoutes from './routes/auth.js';
import roomsRoutes from './routes/rooms.js';
import bookingsRoutes from './routes/bookings.js';
import usersRoutes from './routes/users.js';

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);

if (process.env.ENABLE_SEED === 'true') {
	try {
		const devRoutes = (await import('./routes/dev.js')).default;
		app.use('/api/dev', devRoutes);
		console.log('⚙️  Dev routes enabled');
	} catch (err) {
		console.warn('⚠️  Could not load dev routes:', err.message);
	}
}

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

export default app;
