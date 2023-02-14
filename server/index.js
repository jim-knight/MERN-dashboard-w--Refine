import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

// /api/v1/properties/create

dotenv.config();

const app = express();
// Add CORS as middleware
app.use(cors());

// Add Express as middleware, limit file size from frontend to 50mb
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
	res.send({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
	try {
		// Connect to database
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
	} catch (error) {
		console.log(error);
	}
};

startServer();