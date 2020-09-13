const { HTTP_STATUS } = require('./constants');

const notFound = (req, res, next) => {
	res.status(HTTP_STATUS.NOT_FOUND);
	const error = new Error(`Endpoint ${req.originalUrl} - Not Found`);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	res.status(
		res.statusCode !== HTTP_STATUS.OK
			? res.statusCode
			: HTTP_STATUS.INTERNAL_SERVER_ERROR
	);
	res.set({ 'Content-Type': 'application/json' });
	res.send(
		JSON.stringify({
			message: err.message,
			stack: process.env.NODE_ENV === 'production' ? '-' : err.stack,
		})
	);
};

module.exports = {
	notFound,
	errorHandler,
};
