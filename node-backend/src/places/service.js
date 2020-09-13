const { PROVIDERS } = require('../constants');
const makePlace = require('./place');

const makeService = ({ client, config }) => {
	return {
		getPlaces: (provider, name, lat, lng) => {
			switch (provider) {
				case PROVIDERS.GOOGLE:
					return googleFindPlaces(name, lat, lng);
				case PROVIDERS.MOCK_GOOGLE:
					if (process.env.NODE_ENV !== 'production')
						return mockGoogleFindPlaces(name, lat, lng);
				default:
					throw new Error(`Provider: ${provider} not implemented`);
			}
		},
	};

	async function googleFindPlaces(name, lat, lng) {
		const query = ''.concat(
			`${
				config.services.google.basePath
			}/place/textsearch/json?query=${encodeURIComponent(name)}`,
			lat && lng ? `&location=${lat},${lng}` : '',
			`&key=${config.services.google.key}`
		);
		const { data } = await client.get(query);
		if (data.error_message)
			throw new Error(`Google Places Api Error: ${data.error_message}`);
		return data.results.map(
			({ place_id, name, geometry: { location }, formatted_address }) =>
				makePlace(place_id, name, formatted_address, location, PROVIDERS.GOOGLE)
		);
	}

	async function mockGoogleFindPlaces(name, lat, lng) {
		return Promise.resolve([
			makePlace(
				'test-id',
				name,
				'test-address',
				{ lat, lng },
				PROVIDERS.MOCK_GOOGLE
			),
		]);
	}
};

module.exports = makeService;
