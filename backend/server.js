'use strict';
const {
  getArtsByProperty,
  getArtsByStyle,
  postArtworksByUsers,
} = require('./artWorkHandlers');
const { addUser } = require('./userHandlers');

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
  .get('/api/style/:value', getArtsByStyle)
  .post('/api/upload', postArtworksByUsers)

  // userHandlers
  .post('/api/add/user', addUser)

  .listen(8000, () => console.log(`Listening on port 8000`));
