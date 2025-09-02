import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app.js';
import seedOnStart from './config/seedOnStart.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`✅ Connected to external MongoDB: ${MONGO_URI}`);
	} catch (err) {
		console.warn(`⚠️  Cannot connect to external MongoDB: ${err.message}`);
		console.log(`✅ Starting in-memory MongoDB (fallback)...`);
		const mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`✅ Connected to in-memory MongoDB (fallback)`);
	}
}

async function startServer() {
	await connectDB();

	if (process.env.ENABLE_SEED === 'true') {
		try {
			const createdCount = await seedOnStart();
			console.log(`✅ Seed completed on start. Rooms created: ${createdCount}`);
		} catch (err) {
			console.error(`❌ Seed on start failed:`, err);
		}
	}

	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
}

startServer();
