const makeService = require('../service');
const makePlace = require('../place');
const { PROVIDERS } = require('../../constants');

describe('Service', () => {
	const mockResponse = {
		data: {
			results: [
				{
					place_id: 'test-place-id',
					name: 'test-name',
					geometry: {
						location: {
							lat: 'test-lat',
							lng: 'test-lng',
						},
					},
					formatted_address: 'test-address',
				},
			],
		},
	};
	let requestQuery;

	const mockClient = (response) => ({
		get: async (query) => {
			requestQuery = query;
			return Promise.resolve(response);
		},
	});

	const mockConfig = {
		services: {
			google: {
				basePath: '/base',
				key: 'mockKey',
			},
		},
	};

	it('throws an error if provider is not implemented', async (done) => {
		const expectedResult = new Error('Provider: test-provider not implemented');

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		expect(() => service.getPlaces('test-provider', 'test-name')).toThrow(
			expectedResult
		);
		done();
	});

	it('throws an error if mock_service is called in production', async (done) => {
		const expectedResult = new Error(
			`Provider: ${PROVIDERS.MOCK_GOOGLE} not implemented`
		);

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		process.env = Object.assign(process.env, { NODE_ENV: 'production' });

		expect(() => {
			service.getPlaces(PROVIDERS.MOCK_GOOGLE, 'test');
		}).toThrow(expectedResult);
		process.env = Object.assign(process.env, { NODE_ENV: 'test' });
		done();
	});

	it('returns a response if provider is PROVIDERS.GOOGLE ', async (done) => {
		const {
			place_id,
			name,
			formatted_address,
			geometry,
		} = mockResponse.data.results[0];
		const expectedResponse = [
			makePlace(
				place_id,
				name,
				formatted_address,
				geometry.location,
				PROVIDERS.GOOGLE
			),
		];

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		const response = await service.getPlaces(
			PROVIDERS.GOOGLE,
			'test',
			'test-lat',
			'test-lng'
		);

		expect(response).toEqual(expectedResponse);
		done();
	});

	it('throws an error if provider responds with error ', async (done) => {
		const expectedResult = new Error(
			'Google Places Api Error: google mocked failure'
		);

		const service = makeService({
			client: mockClient({
				data: {
					error_message: 'google mocked failure',
				},
			}),
			config: mockConfig,
		});

		await expect(
			service.getPlaces(PROVIDERS.GOOGLE, 'test', 'test-lat', 'test-lng')
		).rejects.toThrow(expectedResult);
		done();
	});

	it('includes location in query if lat and lang are passed', async (done) => {
		expectedResult =
			'/base/place/textsearch/json?query=test&location=test-lat,test-lng&key=mockKey';

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		await service.getPlaces(PROVIDERS.GOOGLE, 'test', 'test-lat', 'test-lng');

		expect(requestQuery).toEqual(expectedResult);
		done();
	});

	it('does not include location in query if lat and lang are not passed', async (done) => {
		expectedResult = '/base/place/textsearch/json?query=test&key=mockKey';

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		await service.getPlaces(PROVIDERS.GOOGLE, 'test');

		expect(requestQuery).toEqual(expectedResult);
		done();
	});

	it('returns a response if provider is PROVIDERS.MOCK_GOOGLE', async (done) => {
		const expectedResponse = [
			makePlace(
				'test-id',
				'payload-name',
				'test-address',
				{ lat: 'payload-lat', lng: 'payload-lng' },
				PROVIDERS.MOCK_GOOGLE
			),
		];

		const service = makeService({
			client: mockClient(mockResponse),
			config: mockConfig,
		});
		const response = await service.getPlaces(
			PROVIDERS.MOCK_GOOGLE,
			'payload-name',
			'payload-lat',
			'payload-lng'
		);

		expect(response).toEqual(expectedResponse);
		done();
	});
});
