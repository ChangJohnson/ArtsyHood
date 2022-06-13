'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require('uuid');
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

const getArtsByStyle = async (req, res) => {
  const { style } = req.params;

  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const artStyle = await db
    .collection('artWork')
    .find({ style: style })
    .toArray();

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  if (artStyle.length > 0) {
    return res.status(200).json({
      status: 200,
      data: artStyle,
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

const getAllOfUserArtWork = async (req, res) => {
  const { id } = req.params;

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

  if (artWork) {
    return res.status(200).json({
      status: 200,
      data: artWork,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

// ===========================================================

const getPictureById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

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
          commentId: uuidv4(),
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
    ? res.status(200).json({ status: 200, data: result, message: 'success' })
    : res.status(404).json({ status: 404, message: 'Comment was not added.' });
};

// ===========================================================

// delete Comment
const deleteComment = async (req, res) => {
  try {
    const { _id, comment } = req.body;
    console.log(req.body.comment);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db('ArtsyHood');

    const result = await db.collection('artWork').updateOne(
      { _id: _id },
      {
        $pull: {
          comments: {
            authorHandle: comment.authorHandle,
            comment: comment.comment,
            nickname: comment.nickname,
            picture: comment.picture,
            commentId: comment.commentId,
          },
        },
        $inc: { numOfComments: -1 },
      }
    );

    client.close();
    res
      .status(200)
      .json({ status: 200, message: 'Comment deleted', result: result });
  } catch (err) {
    console.log('err', err);
    res.status(404).json({ status: 404, message: 'Not Found', error: err });
  }
};

// ===========================================================

const patchUpdateLikes = async (req, res) => {
  const { _id, user } = req.body;

  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const searchResult = await db
    .collection('artWork')
    .findOne({ _id: _id, numOfLikes: [{ user: user }] });

  console.log('123456789', searchResult);
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
    //Close client
    client.close();
    console.log('disconnected!');
    //Close client

    addLike.modifiedCount === 1
      ? res
          .status(200)
          .json({ status: 200, data: _id, message: 'Successfully Liked' })
      : res.status(404).json({ status: 404, message: 'Not Found' });
  } else {
    const removeLike = await db.collection('artWork').updateOne(
      { _id: _id },
      {
        $pull: {
          numOfLikes: {
            user,
          },
        },
      }
    );

    //Close client
    client.close();
    console.log('disconnected!');
    //Close client
    removeLike.modifiedCount === 1
      ? res
          .status(201)
          .json({ status: 201, data: _id, message: 'Successfully Unliked' })
      : res.status(404).json({ status: 404, message: 'Not Found' });
  }
};

// ===========================================================
// get Likes on mount
const getLikes = async (req, res) => {
  const { user } = req.params;

  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const likes = await db
    .collection('artWork')
    .find({ numOfLikes: [{ user: user }] })
    .toArray();

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  const allLikes = likes.map((like) => {
    return like._id;
  });

  if (likes.length > 0) {
    return res.status(200).json({
      status: 200,
      data: allLikes,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
};

const getAllArtWorks = async (req, res) => {
  const { user } = req.params;

  const client = new MongoClient(MONGO_URI, options);

  //Connect client
  await client.connect();
  console.log('connected!');
  const db = client.db('ArtsyHood');
  //Connect client

  const results = await db.collection('artists').findOne({ _id: user });

  const followingsData = results.followings.map((result) => {
    return result._id;
  });

  const artists = await db.collection('artists').find().toArray();

  const filteredArtists = artists.map((el) => {
    return {
      _id: el._id,
      nickname: el.nickname ? el.nickname : '',
      artistPicture: el.picture,
    };
  });

  const artWorks = await db.collection('artWork').find().toArray();
  const followArtWork = artWorks.filter((el) =>
    followingsData.includes(el.sub)
  );
  const mergeData = followArtWork.map((el) => {
    return {
      ...filteredArtists.find((artist) => el.sub === artist._id),
      ...el,
    };
  });

  //Close client
  client.close();
  console.log('disconnected!');
  //Close client

  if (mergeData.length > 0) {
    return res.status(200).json({
      status: 200,
      data: mergeData,
    });
  }
  return res.status(404).json({ status: 404, message: 'Not found!' });
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
  deleteComment,
  getLikes,
  getAllArtWorks,
};
