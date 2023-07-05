import createFileLogger from './setup/logging';
import app from './app';

const logger = createFileLogger(__filename);

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Example apps listening on port ${port}!`));
