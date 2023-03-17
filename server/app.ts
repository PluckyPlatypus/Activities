import express, { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import Router from './src/routes/routes';

const app: Express = express();

app.use(express.json());

// TODO: fix swagger
app.use(
  "/docs",
  serve,
  setup(undefined, {
    swaggerOptions: {
      url: "swagger.json",
    },
  })
);

// setup routes
app.use(Router);

export default app;