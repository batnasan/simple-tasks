import 'reflect-metadata';

import express, { Request, Response, Express } from 'express';
import { Page } from './src/page';
import { Post } from './src/post';
import { User } from './src/user';
import { container } from './src/config/container';

const app: Express = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express application');
});

const pageClass = container.get<Page>(Page);

app.post('/create-page', (req: Request, res: Response) => {
  let page = pageClass.createPage('http://mypage.com');
  res.json(page);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
