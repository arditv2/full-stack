const middlewares = require('../middlewares');
const { HTTP_STATUS } = require('../constants');

class MockResponseHandler {
	constructor(statusCode, headers, data) {
		this.statusCode = statusCode;
		this.headers = headers;
		this.data = data;
	}

	status = (_statusCode) => {
		this.statusCode = _statusCode;
	};
	set = (_headers) => {
		this.headers = _headers;
	};
	send = (_data) => {
		this.data = _data;
	};
}

describe('Not found', () => {
	it('sets NOT_FOUND to response and calls next with error', () => {
		const next = jest.fn();
		const mockResponseHandler = new MockResponseHandler(HTTP_STATUS.OK);

		middlewares.notFound({ originalUrl: 'testUrl' }, mockResponseHandler, next);

		expect(mockResponseHandler.statusCode).toEqual(HTTP_STATUS.NOT_FOUND);
		expect(next).toHaveBeenCalledWith(
			new Error('Endpoint testUrl - Not Found')
		);
	});
});

describe('Error handler', () => {
	it('returns response status code if response has already one and is different than OK', () => {
		const mockResponseHandler = new MockResponseHandler(
			HTTP_STATUS.BAD_REQUEST
		);
		const err = new Error('Mock test');

		middlewares.errorHandler(err, {}, mockResponseHandler, {});

		expect(mockResponseHandler.statusCode).toEqual(HTTP_STATUS.BAD_REQUEST);
		expect(mockResponseHandler.headers).toEqual({
			'Content-Type': 'application/json',
		});
		const parsedData = JSON.parse(mockResponseHandler.data);
		expect(parsedData.message).toEqual(err.message);
		expect(parsedData.stack).toContain(err.message);
	});

	it('returns INTERNAL_SERVER_ERROR if response contains OK status code', () => {
		const mockResponseHandler = new MockResponseHandler(HTTP_STATUS.OK);
		const err = new Error('Mock test');

		middlewares.errorHandler(err, {}, mockResponseHandler, {});

		expect(mockResponseHandler.statusCode).toEqual(
			HTTP_STATUS.INTERNAL_SERVER_ERROR
		);
		expect(mockResponseHandler.headers).toEqual({
			'Content-Type': 'application/json',
		});
		const parsedData = JSON.parse(mockResponseHandler.data);
		expect(parsedData.message).toEqual(err.message);
		expect(parsedData.stack).toContain(err.message);
	});

	it('returns no stack if NODE_ENV is production', () => {
		const mockResponseHandler = new MockResponseHandler(HTTP_STATUS.OK);
		const err = new Error('Mock test');
		process.env = Object.assign(process.env, { NODE_ENV: 'production' });

		middlewares.errorHandler(err, {}, mockResponseHandler, {});

		expect(mockResponseHandler.statusCode).toEqual(
			HTTP_STATUS.INTERNAL_SERVER_ERROR
		);
		expect(mockResponseHandler.headers).toEqual({
			'Content-Type': 'application/json',
		});
		process.env = Object.assign(process.env, { NODE_ENV: 'test' });
		const parsedData = JSON.parse(mockResponseHandler.data);
		expect(parsedData.message).toEqual(err.message);
		expect(parsedData.stack).toEqual('-');
	});
});
