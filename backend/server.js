'use strict';
const {
  getArtsByProperty,
  getArtsByStyle,
  postArtworksByUser,
  getSingleArtwork,
} = require('./artWorkHandlers');

const { addUser, updateUser } = require('./userHandlers');

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
  .get('/api/style/:value', getArtsByStyle)
  .post('/api/upload', postArtworksByUser)

  // userHandlers
  .post('/api/add/user', addUser)
  .put('/api/update/user', updateUser)

  .listen(8000, () => console.log(`Listening on port 8000`));
