require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './middleware/error';
import userRoutes from './routes/users';
import massageRoutes from './routes/massage';

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/massages', massageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
