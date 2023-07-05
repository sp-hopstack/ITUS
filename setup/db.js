import mongodb from 'mongodb';
import config from 'config';
const logger = require('./logging.js')(__filename);

const MongoClient = mongodb.MongoClient;
const url = config.get('dbUrl');
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 1,
  poolSize: 1,
});

export const loadDb = async () => {
  await client.connect();
  logger.info(`Connected to the DB Successfully`);
  return client;
};

export default client;
