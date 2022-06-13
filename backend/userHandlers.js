'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require('uuid');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// ================================================================

//check if user exists at login and add the user if the user doesnt exist
const addUser = async (req, res) => {
  const user = req.body;

  const checkId = { _id: user.user.sub };

  const update = {
    $set: {
      _id: user.user.sub,
      given_name: user.user.given_name,
      family_name: user.user.family_name,
      nickname: user.user.nickname,
      picture: user.user.picture,
      locale: user.user.locale,
      updated_at: user.user.updated_at,
      email: user.user.email,
      email_verified: user.user.email_verified,
    },
  };
  const upsert = { upsert: true };

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const result = await db
    .collection('artists')
    .updateOne(checkId, update, upsert);

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  result.modifiedCount === 0
    ? res.status(201).json({
        status: 201,
        data: user.user.sub,
        message: 'User added to MongoDb!',
      })
    : res.status(404).json({
        status: 404,
        data: user.user.sub,
        message: 'User was added already!',
      });
};

// ================================================================

const updateUser = async (req, res) => {
  const user = req.body;

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const checkId = { _id: user.userId };
  const update = {
    $set: {
      name: user.name,
      address: user.address,
      apt: user.apt,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      country: user.country,
      phoneNumber: user.phoneNumber ? user.phoneNumber : '',
    },
  };

  const result = await db.collection('artists').updateOne(checkId, update);

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  result.modifiedCount === 1
    ? res.status(200).json({
        status: 200,
        message: 'User updated!',
      })
    : res.status(404).json({
        status: 404,
        message: 'User fail to update!',
      });
};

// ================================================================

// get user by Id
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db('ArtsyHood');
  const result = await db
    .collection('artists')
    .findOne({ _id: req.params._id });

  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: 'Not Found' });

  client.close();
};

// ================================================================

const updateFollow = async (req, res) => {
  const { _id, user } = req.body;
  console.log('.....', req.body);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db('ArtsyHood');

  const searchResult = await db
    .collection('artists')
    .findOne({ _id: user, followings: [{ _id }] });
  console.log('======', searchResult);
  if (searchResult === null) {
    const addFollow = await db.collection('artists').updateOne(
      { _id: user },
      {
        $push: {
          followings: {
            _id,
          },
        },
      }
    );

    client.close();
    console.log('44444444', addFollow);
    addFollow.modifiedCount === 1
      ? res
          .status(200)
          .json({ status: 200, data: _id, message: 'Successfully followed' })
      : res.status(404).json({ status: 404, message: 'Not Found' });
  } else {
    const removeFollow = await db.collection('artists').updateOne(
      { _id: user },
      {
        $pull: {
          followings: {
            _id,
          },
        },
      }
    );

    client.close();
    console.log('546546546', removeFollow);
    removeFollow.modifiedCount === 1
      ? res
          .status(201)
          .json({ status: 201, data: _id, message: 'Successfully unfollowed' })
      : res.status(404).json({ status: 404, message: 'Not Found' });
  }
};

// ================================================================

// get all the user followings on Mount
const getFollowings = async (req, res) => {
  const { user } = req.params;

  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const results = await db.collection('artists').findOne({ _id: user });

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  console.log('==========', results);

  const resultsIdsArr = results.followings.map((result) => {
    return result._id;
  });

  console.log('+++++++++++++', resultsIdsArr);

  if (resultsIdsArr.length > 0) {
    return res.status(200).json({
      status: 200,
      data: resultsIdsArr,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

// ================================================================

module.exports = { addUser, updateUser, getUser, updateFollow, getFollowings };
