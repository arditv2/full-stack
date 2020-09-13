const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');
const placesRequestHandler = require('./places');
const adaptRequest = require('./helpers/http-request');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
	res.status(200);
	res.send('Healthy');
});

app.all('/api/v1/places', async (req, res, next) => {
	try {
		const httpRequest = adaptRequest(req);
		const { statusCode, headers, data } = await placesRequestHandler(
			httpRequest
		);
		res.set(headers).status(statusCode).send(data);
	} catch (error) {
		next(error);
	}
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
