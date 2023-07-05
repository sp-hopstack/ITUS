import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import setupRoutes from './setup/routes';

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json({ limit: '100mb' }));
setupRoutes(app);

export default app;
