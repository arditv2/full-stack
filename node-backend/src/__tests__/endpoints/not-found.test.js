const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const { HTTP_STATUS } = require('../../constants');

describe('Not found endpoint', () => {
	it('returns NOT_FOUND if requested endpoint is not found', async (done) => {
		const expectedResult =
			'Endpoint /some-endpoint-which-does-not-exist - Not Found';

		const response = await request.get('/some-endpoint-which-does-not-exist');

		expect(response.status).toEqual(HTTP_STATUS.NOT_FOUND);
		const parsedResponse = JSON.parse(response.text);
		expect(parsedResponse.message).toEqual(expectedResult);
		done();
	});
});
