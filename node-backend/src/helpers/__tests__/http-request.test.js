const adaptRequest = require('../http-request');

describe('adaptRequest', () => {
	it('returns a frozen request object', () => {
		const mockRequest = {
			method: 'POST',
			query: { foo: 'bar' },
		};

		const requestObject = adaptRequest(mockRequest);
		requestObject.query = {};

		expect(requestObject).toEqual(mockRequest);
	});
});
