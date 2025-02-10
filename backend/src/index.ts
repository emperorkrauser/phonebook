import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Router } from 'express';
import { MongoServer } from './mongo-server';
import { ContactRouter, UserRouter, AuthRouter } from './routes';

MongoServer;

const port = process.env.PORT || 3001;
const app = express();
const AppRouter = Router();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
// logger middleware
app.use((req, res, next) => {
  const newTime = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, newTime);
  next();
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/api', AppRouter);

AuthRouter(AppRouter);
UserRouter(AppRouter);
ContactRouter(AppRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
