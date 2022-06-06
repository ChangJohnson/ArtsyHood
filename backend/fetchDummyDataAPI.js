const { response } = require('express');
const request = require('request-promise');

const apiRandomUsers = {
  uri: 'https://dummyapi.io/data/v1/user?page=1&limit=10 ',

  headers: {
    'app-id': '629cf037e54a3017a4597f27',
    Accept: 'application/json',
  },

  json: true, // Automatically parses the JSON string in the response
};

const DummyDataForRandomUsers = async () => {
  try {
    return await request(apiRandomUsers).then((response) => response);
  } catch (err) {
    console.log(err);
  }
};

DummyDataForRandomUsers().then((data) => console.log(data));
