const { ObjectId } = require('mongodb');

module.exports = [
  {
    _id: new ObjectId().toHexString(),
    name: 'letni',
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'zimowy',
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'wiosenny',
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'jesienny',
  },
];
