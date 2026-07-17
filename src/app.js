import express from 'express';
import { router } from './routes.js';
import authRepositories from './app/repositories/authRepositories.js';

const app = express();

app.use(express.json());

app.use(router);

export default app;
