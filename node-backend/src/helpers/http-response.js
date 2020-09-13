const makeHttpResponse = (statusCode, data) =>
	Object.freeze({
		statusCode,
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify(data),
	});

module.exports = makeHttpResponse;
