require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
// import session from 'express-session';
import errorHandler from './middleware/error';
// import userRoutes from './routes/users';

const app = express();
const PORT = 4200;

app.use(bodyParser.json());

// Routes
app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/stripe', stripeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
