'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require('uuid');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Update a user
const addUser = async (req, res) => {
  const user = req.body;

  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const collection = { name: 'artists' };
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
  const upsert = {};
  const result = await db
    .collection('artists')
    .updateOne(collection, update, upsert);

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  result.acknowledged
    ? res.status(201).json({
        status: 201,
        data: user.user.sub,
        message: 'User added to MongoDb!',
      })
    : res.status(404).json({ status: 404, message: 'User was added already!' });
};

module.exports = { addUser };
