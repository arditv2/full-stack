const { HTTP_STATUS } = require('../constants');
const makeHttpResponse = require('../helpers/http-response');

const makeRequestHandler = ({ service }) => async (httpRequest) => {
	switch (httpRequest.method) {
		case 'GET':
			return getPlaces(httpRequest);
		default:
			return makeHttpResponse(HTTP_STATUS.METHOD_NOT_ALLOWED, {
				message: 'Method not allowed',
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
