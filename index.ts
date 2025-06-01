import 'reflect-metadata';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import express, { Express } from 'express';
import { addRoutes } from './src/config/routes.config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Cannot read environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log(`Connected to Montodb`);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
