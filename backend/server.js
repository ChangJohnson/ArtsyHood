'use strict';
const {
  getArtsByProperty,
  getArtsByStyle,
  postArtworksByUser,
  getSingleArtwork,
  getAllOfUserArtWork,
  postComments,
  getPictureById,
  patchUpdateLikes,
  deleteComment,
  getLikes,
} = require('./artWorkHandlers');

const {
  addUser,
  updateUser,
  getUser,
  updateFollow,
} = require('./userHandlers');

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  .use(morgan('tiny'))
  .use(express.json())
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ limit: '50mb', extended: true }))

  // artWorkHandlers
  .get('/api/arts/:key/:value', getArtsByProperty)
  .get('/api/art/:name/:id', getSingleArtwork)
  .get('/api/style/:style', getArtsByStyle)
  .post('/api/upload', postArtworksByUser)
  .get('/api/all-art-work/:id', getAllOfUserArtWork)

  // post and get comments ,delete  and updateLikes
  .post('/api/post-comment', postComments)
  .get('/api/art-by/:_id', getPictureById)
  .patch('/api/update-likes', patchUpdateLikes)
  .delete('/api/delete-comment', deleteComment)
  .get('/api/get-all-likes/:user', getLikes)

  // ========================================

  // userHandlers
  .post('/api/add/user', addUser)
  .put('/api/update/user', updateUser)
  .get('/api/profile/:_id', getUser)
  .patch('/api/follow', updateFollow)

  .listen(8000, () => console.log(`Listening on port 8000`));
