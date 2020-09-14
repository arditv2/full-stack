const makeRequestHandler = require('../request-handler');
const { HTTP_STATUS, HTTP_METHOD } = require('../../constants');

describe('Request Handler', () => {
  const mockService = {
    getPlaces: () => {
      return {
        id: 'test',
      };
    },
  };

  let handler;
  beforeEach(() => {
    handler = makeRequestHandler({
      service: mockService,
    });
  });

  it('returns METHOD_NOT_ALLOWED if request method is different than GET', async (done) => {
    const expectedResult = {
      message: `${HTTP_METHOD.POST} method is not allowed`,
    };
    const response = await handler({
      method: HTTP_METHOD.POST,
      query: { provider: 'test', name: 'test' },
    });
    expect(response.statusCode).toEqual(HTTP_STATUS.METHOD_NOT_ALLOWED);
    expect(response.data).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('returns BAD_REQUEST if query parameter "provider" is missing', async (done) => {
    const expectedResult = {
      message: 'Provider is required',
    };

    const response = await handler({
      method: HTTP_METHOD.GET,
      query: { name: 'test' },
    });
    expect(response.statusCode).toEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.data).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('returns BAD_REQUEST if query parameter "name" is missing', async (done) => {
    const expectedResult = {
      message: 'Name is required',
    };

    const response = await handler({
      method: HTTP_METHOD.GET,
      query: { provider: 'test' },
    });
    expect(response.statusCode).toEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.data).toEqual(JSON.stringify(expectedResult));
    done();
  });

  it('returns OK with stringified data if all required query parameters are passed', async (done) => {
    const expectedResult = {
      id: 'test',
    };
    const response = await handler({
      method: HTTP_METHOD.GET,
      query: { provider: 'test', name: 'test' },
    });
    expect(response.statusCode).toEqual(HTTP_STATUS.OK);
    expect(response.data).toEqual(JSON.stringify(expectedResult));
    done();
  });
});
