'use strict';
const { getArtsByProperty, getArtsByStyle } = require('./handlers');

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  .use(morgan('tiny'))
  .use(express.json())

  .get('/api/arts/:key/:value', getArtsByProperty)
  .get('/api/style/:value', getArtsByStyle)

  .listen(8000, () => console.log(`Listening on port 8000`));
