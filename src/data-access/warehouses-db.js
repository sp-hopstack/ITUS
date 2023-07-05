import Id from '../utils/Id';

const collection = 'warehouses';
export default function makeWarehousesDb({ makeDb }) {
  async function filtered(query, sort, perPage, pageNumber) {
    const db = await makeDb();
    let sortKey;
    if (sort) {
      let order = 1;
      if (sort.indexOf('-') !== -1) {
        // eslint-disable-next-line no-param-reassign
        sort = sort.replace('-', '');
        order = -1;
      }

      sortKey = { [sort]: order };
    }
    const skip = perPage * pageNumber - perPage;
    const result = await db
      .collection(collection)
      .find(query)
      .sort(sortKey)
      .skip(skip)
      .limit(perPage);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function countDocuments(query) {
    const db = await makeDb();
    const result = await db.collection(collection).countDocuments(query);
    return result;
  }

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection(collection).find(query);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    // eslint-disable-next-line no-param-reassign
    _id = Id.convertId(_id);
    const db = await makeDb();
    const result = await db.collection(collection).find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findOne(query) {
    const db = await makeDb();
    const result = await db.collection(collection).find(query);
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id = Id.makeId(), ...warehouseInfo }) {
    const db = await makeDb();
    const result = await db
      .collection(collection)
      .insertOne({ _id, ...warehouseInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function update({ id: _id, ...warehouseInfo }) {
    const db = await makeDb();
    const result = await db
      .collection(collection)
      .updateOne({ _id }, { $set: { ...warehouseInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...warehouseInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection(collection).deleteOne({ _id });
    return result.deletedCount;
  }

  return Object.freeze({
    find,
    findOne,
    findById,
    insert,
    remove,
    update,
    filtered,
    countDocuments,
  });
}
