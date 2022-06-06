'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get the art for the searchbar
const getArtsByProperty = async (req, res) => {
  // const page = req.query.page ? Number(req.query.page) : 1;
  // const limit = 20;
  // const start = limit * (page - 1);

  const query = {
    [req.params.key]: { $regex: req.params.value.toLowerCase(), $options: 'i' },
  };

  console.log('--------', query);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');

  const result = await db.collection('artWork').find(query).toArray();

  // const [total, products] = await mongoReadLimit('items', query, start, limit);

  client.close();
  console.log('disconnected!');
  console.log('========', result);

  if (result.length > 0) {
    return res.status(200).json({
      status: 200,
      data: result,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

const getArtsByStyle = async (req, res) => {
  const categories = await mongoReadDistinct('items', null, 'category');
  console.log(categories);
  if (categories.length > 0) {
    return res.status(200).json({
      status: 200,
      data: categories,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

module.exports = {
  getArtsByProperty,
  getArtsByStyle,
};
