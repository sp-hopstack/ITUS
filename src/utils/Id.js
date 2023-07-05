const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const Id = Object.freeze({
  makeId: () => new mongo.ObjectID(),
  isValidId: (id) => {
    const pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return pattern.test(id);
  },
  convertId: (id) => ObjectId(id),
});

export default Id;
