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
  const { name, id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log('connected!');
    const db = client.db('ArtsyHood');
    //Connect client

    const artWork = await db.collection('artWork').findOne({ name: name });
    const artist = await db.collection('artists').findOne({ _id: id });

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
// TODO
const getAllOfUserArtWork = async (req, res) => {
  // TODO
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);

    //Connect client
    await client.connect();
    console.log('connected!');
    const db = client.db('ArtsyHood');
    //Connect client

    const artWork = await db.collection('artWork').find({ sub: id }).toArray();

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

// ===========================================================

const getPictureById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log('============', req.params._id);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const result = await db
    .collection('artWork')
    .findOne({ _id: req.params._id });

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, message: 'Not Found' });
};

// ===========================================================

// post and gets the comment to be render at the FE
const postComments = async (req, res) => {
  const { user, comment, _id, picture, nickname } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client
  const result = await db.collection('artWork').updateMany(
    { _id: _id },
    {
      $push: {
        comments: {
          nickname: nickname,
          comment: comment,
          picture: picture,
          authorHandle: user,
        },
      },
      $inc: { numOfComments: +1 },
    }
  );
  //Close client
  client.close();
  console.log('disconnected!');
  //Close client
  result.modifiedCount === 1
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, message: 'Comment was not added.' });
};

// ===========================================================
// TODO
const patchUpdateLikes = async (req, res) => {
  const { _id, user, setLike } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client
  console.log(user);

  const searchResult = await db
    .collection('artWork')
    .findOne({ _id: _id, numOfLikes: [user] });

  console.log('============', searchResult);
  if (searchResult === null) {
    const addLike = await db.collection('artWork').updateOne(
      { _id: _id },
      {
        $push: {
          numOfLikes: {
            user,
          },
        },
      }
    );
  } else {
    const addLike = await db.collection('artWork').updateOne(
      { _id: _id },
      {
        $pull: {
          numOfLikes: {
            user,
          },
        },
      }
    );
  }

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  // addLike.modifiedCount === 1 || removeLike.modifiedCount === 1
  //   ? res
  //       .status(200)
  //       .json({ status: 200, message: 'Successfully Liked or Unliked' })
  //   : res.status(404).json({ status: 404, message: 'Not Found' });
};

module.exports = {
  getArtsByProperty,
  getArtsByStyle,
  postArtworksByUser,
  getSingleArtwork,
  getAllOfUserArtWork,
  getPictureById,
  postComments,
  patchUpdateLikes,
};
