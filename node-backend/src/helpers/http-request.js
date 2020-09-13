const { query } = require('express');

const adaptRequest = (req) =>
	Object.freeze({
		method: req.method,
		query: req.query,
	});

module.exports = adaptRequest;
