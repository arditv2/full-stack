const { HTTP_STATUS, HTTP_METHOD } = require('../constants');
const makeHttpResponse = require('../helpers/http-response');

const makeRequestHandler = ({ service }) => async (httpRequest) => {
  switch (httpRequest.method) {
    case HTTP_METHOD.GET:
      return getPlaces(httpRequest);
    default:
      return makeHttpResponse(HTTP_STATUS.METHOD_NOT_ALLOWED, {
        message: `${httpRequest.method} method is not allowed`,
      });
  }

  async function getPlaces({ query }) {
    if (!query.provider)
      return makeHttpResponse(HTTP_STATUS.BAD_REQUEST, {
        message: 'Provider is required',
      });
    if (!query.name)
      return makeHttpResponse(HTTP_STATUS.BAD_REQUEST, {
        message: 'Name is required',
      });

    const { provider, name, lat, lng } = query;
    const response = await service.getPlaces(provider, name, lat, lng);
    return makeHttpResponse(HTTP_STATUS.OK, response);
  }
};

module.exports = makeRequestHandler;
