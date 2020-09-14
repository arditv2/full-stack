const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const { HTTP_STATUS } = require('../../constants');

describe('Places endpoint', () => {
  it('Returns METHOD_NOT_ALLOWED if method is different than GET', async (done) => {
    const expectedResult = {
      message: 'POST method is not allowed',
    };

    const response = await request.post(
      '/api/v1/places?provider=mock_google&name=hamburg'
    );

    expect(response.status).toEqual(HTTP_STATUS.METHOD_NOT_ALLOWED);
    expect(response.text).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('Returns BAD_REQUEST if provider is missing', async (done) => {
    const expectedResult = {
      message: 'Provider is required',
    };

    const response = await request.get('/api/v1/places');

    expect(response.status).toEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.text).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('Returns BAD_REQUEST if name is missing', async (done) => {
    const expectedResult = {
      message: 'Name is required',
    };

    const response = await request.get('/api/v1/places?provider=mock_google');

    expect(response.status).toEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.text).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('Returns OK if all paramters are passed', async (done) => {
    const expectedResult = [
      {
        id: 'test-id',
        name: 'hamburg',
        address: 'test-address',
        provider: 'mock_google',
      },
    ];

    const response = await request.get(
      '/api/v1/places?provider=mock_google&name=hamburg'
    );

    expect(response.status).toEqual(HTTP_STATUS.OK);
    expect(response.text).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('Returns INTERNAL_SERVER_ERROR if provider is not implemented', async (done) => {
    const expectedResult = 'Provider: non-existent-provider not implemented';

    const response = await request.get(
      '/api/v1/places?provider=non-existent-provider&name=hamburg'
    );

    expect(response.status).toEqual(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.message).toEqual(expectedResult);
    expect(parsedResponse.stack).toContain(expectedResult);
    done();
  });
});
