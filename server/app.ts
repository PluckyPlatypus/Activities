import express, { Express } from 'express';
import cors from 'cors';
import Router from './src/routes/routes';
import swaggerUI from 'swagger-ui-express';

import swaggerDoc from './swagger.json';


const app: Express = express();

app.use(express.json());

app.use(cors());

app.use(
  '/docs',
  swaggerUI.serve, 
  swaggerUI.setup(swaggerDoc)
);

// setup routes
app.use(Router);

export default app;