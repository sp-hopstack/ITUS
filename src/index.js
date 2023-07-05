import config from 'config';
import app from './app';
import { loadDb } from './setup/db';

import setupLogger from './setup/logging';

const logger = setupLogger(__filename);
const port = config.get('port');

(async () => {
  await loadDb();
})();

app.listen(port, () =>
  logger.info(`${config.get('appName')} listening on port ${port}!`),
);
