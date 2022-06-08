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
      name: user.user.name,
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
  console.log('+++++++++++++++', user);

  const findUser = await db.collection('artists').findOne({ _id: user.userId });
  console.log('================', findUser);

  const checkId = { _id: user.userId };
  const update = {
    $set: {
      name: user.name ? user.name : findUser.name,
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

module.exports = { addUser, updateUser };
