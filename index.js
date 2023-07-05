import express from 'express';
const logger = require('./setup/logging.js')(__filename);
import { loadDb } from './setup/db';
import config from 'config';

(async () => {
  await loadDb();
})();

const app = express();
const port = config.get('port');

app.listen(port, () =>
  logger.info(`${config.get('appName')} listening on port ${port}!`),
);
