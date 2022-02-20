import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import accountRoutes from './api/routes/account.js';
import emailRoutes from './api/routes/email.js';


const app = express();
const origin = '*';
// app.use(express.json());


dotenv.config();
app.use(cors({ origin }));
app.use(express.json({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ limit: '1mb', extended: false }));
app.use(morgan('dev'));



const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true };

// connect to db
mongoose
  .connect(process.env.MONGO_URI, DEPRECATED_FIX)
  .catch((error) => console.log('❌ MongoDB connection error', error));

const db = mongoose.connection;

db.on('connected', () => console.log(' MongoDB connected'));
db.on('disconnected', () => console.log('❌ MongoDB disconnected'));
db.on('error', (error) => console.log('❌ MongoDB connection error', error));

// routes
app.get('/', (request, response, next) => response.status(200).json('MERN Gmail clone'));
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/email', emailRoutes);

// if (process.env.NODE_ENV === 'production') {

//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// arcane-inlet-86488

app.listen(process.env.PORT || 8080, () => {
  console.log(" Server is listening on port");
});
