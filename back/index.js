import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

async function connectToMongo() {
	try {
		if (MONGO_URI) {
			await mongoose.connect(MONGO_URI);
			console.log('✅ MongoDB connected (external)');
			return;
		}
	} catch (err) {
		console.warn('⚠️  Cannot connect to external MongoDB:', err.message);
	}

	try {
		const { MongoMemoryServer } = await import('mongodb-memory-server');
		const mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		await mongoose.connect(uri);
		console.log('✅ Connected to in-memory MongoDB (fallback)');
	} catch (err) {
		console.error('❌ Failed to start in-memory MongoDB:', err);
		process.exit(1);
	}
}

(async () => {
	try {
		await connectToMongo();

		if (process.env.ENABLE_SEED === 'true') {
			try {
				const seed = (await import('./config/seedOnStart.js')).default;
				await seed();
			} catch (err) {
				console.warn('⚠️  Seed on start failed:', err.message || err);
			}
		}

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('❌ Server start error:', err);
		process.exit(1);
	}
})();
