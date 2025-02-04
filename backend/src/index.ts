import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Router } from 'express';
import { MongoServer } from './mongo-server';
import { ContactRouter, UserRouter, AuthRouter } from './routes';

MongoServer;

const port = 3001;
const app = express();
const AppRouter = Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', AppRouter);

ContactRouter(AppRouter);
UserRouter(AppRouter);
AuthRouter(AppRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
