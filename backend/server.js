'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  .use(morgan('tiny'))
  .use(express.json())
  .listen(8000, () => console.log(`Listening on port 8000`));
