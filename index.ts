import 'reflect-metadata';

import express, { Request, Response, Express } from 'express';
import { tasksRouter } from './src/tasks/tasks.router';

const app: Express = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express application');
});

app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
