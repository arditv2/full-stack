const makeHttpResponse = require('../http-response');

describe('makeHttpResponse', () => {
	it('returns a frozen response object', () => {
		const mockResponse = {
			status: 200,
			data: { foo: 'bar' },
		};

		const response = makeHttpResponse(mockResponse.status, mockResponse.data);
		response.statusCode = 500;

		expect(response.statusCode).toEqual(mockResponse.status);
		expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
		expect(response.data).toEqual(JSON.stringify(mockResponse.data));
	});
});
