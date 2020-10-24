require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './middleware/error';
// import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
