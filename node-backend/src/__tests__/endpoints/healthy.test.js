const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const { HTTP_STATUS } = require('../../constants');

describe('Root endpoint', () => {
	it('returns OK if application is running', async (done) => {
		const expectedResult = 'Healthy';

		const response = await request.get('/');

		expect(response.status).toEqual(HTTP_STATUS.OK);
		expect(response.text).toEqual(expectedResult);
		done();
	});
});
