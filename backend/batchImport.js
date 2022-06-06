const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { MONGO_URI } = process.env;
// test
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const items = require('./db/artWork.json');
const artists = require('./db/artists.json');

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //------------------------------------------------------------------------------------------
  //Queries

  //Insert each item to collection
  // items.forEach(async (item) => {
  //   await db.collection('items').insertOne({ ...item, _id: uuidv4() });
  // });

  //Insert each companies to collection
  // await db.collection('artists').insertMany(artists);
  await db.collection('artWork').insertMany(items);

  //Create Users collection
  // await db.createCollection('users');

  //Making User Email unique
  // await db.collection('users').createIndex({ email: 1 }, { unique: true });

  //------------------------------------------------------------------------------------------

  //Disconnect client
  client.close();
  console.log('disconnected!');
  //Disconnect client
};

batchImport();
