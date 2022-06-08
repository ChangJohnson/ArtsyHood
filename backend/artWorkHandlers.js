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
  const query = {
    [req.params.key]: { $regex: req.params.value.toLowerCase(), $options: 'i' },
  };

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');

  const result = await db.collection('artWork').find(query).toArray();

  client.close();
  console.log('disconnected!');

  if (result.length > 0) {
    return res.status(200).json({
      status: 200,
      data: result,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

// ================================================================

// TODO it is not finished
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

// ================================================================

const postArtworksByUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');

  const artWorkFile = req.body.data;
  const result = await db.collection('artWork').insertOne(artWorkFile);

  client.close();
  console.log('disconnected!');

  result.acknowledged
    ? res.status(200).json({
        status: 200,
        message: 'Success!',
      })
    : res
        .status(404)
        .json({ status: 404, message: 'It didnt upload. Please try again.' });
};

// ================================================================

const getSingleArtwork = async (req, res) => {
  //-----------------------------------------------------------------------------//
  //**Check if _id is a number then convert it to the (Number).**                //
  //I added this because initial data contains (Number) as _id but adding data_ //
  //with endpoint contains UUidv4(string) as _id                                 //
  //-----------------------------------------------------------------------------//
  const { _id } = req.params;
  try {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log('connected!');
    const db = client.db('ArtsyHood');
    //Connect client

    const artWork = await db.collection('artWork').findOne({ sub: _id });
    const artist = await db.collection('artists').findOne({ _id });

    console.log('+++++++', artWork);
    console.log('=======', artist);

    //Close client
    client.close();
    console.log('disconnected!');
    //Close client

    if (artWork && artist) {
      return res.status(200).json({
        status: 200,
        data: { ...artWork, artist },
      });
    }
    return res.status(404).json({ status: 404, message: 'Not found!' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// ================================================================

module.exports = {
  getArtsByProperty,
  getArtsByStyle,
  postArtworksByUser,
  getSingleArtwork,
};
