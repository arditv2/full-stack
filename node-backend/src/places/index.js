const axios = require('axios');

const makeRequestHandler = require('./request-handler');
const makeService = require('./service');
const config = require('./config');

const service = makeService({ client: axios, config });
const requestHandler = makeRequestHandler({ service });

module.exports = requestHandler;
