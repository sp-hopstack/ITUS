import mongodb from 'mongodb';
import config from 'config';
import makeWarehousesDb from './warehouses-db';
import makeCustomersDb from './customers-db';

const { MongoClient } = mongodb;
const url = config.get('dbUrl');
const dbName = config.get('dbName');
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const warehousesDb = makeWarehousesDb({ makeDb });
const customersDb = makeCustomersDb({ makeDb });
export { warehousesDb, customersDb };
