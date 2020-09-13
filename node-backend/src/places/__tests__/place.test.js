const makePlace = require('../place');

describe('Place', () => {
	it('throws an error if id is missing', () => {
		const expectedResult = new Error('Place must have an Id');
		expect(() => {
			makePlace(
				undefined,
				'test-name',
				'test-address',
				undefined,
				'test-provider'
			);
		}).toThrow(expectedResult);
	});

	it('throws an error if name is missing', () => {
		const expectedResult = new Error('Place must have a name');
		expect(() => {
			makePlace(
				'test-id',
				undefined,
				'test-address',
				undefined,
				'test-provider'
			);
		}).toThrow(expectedResult);
	});

	it('throws an error if address is missing', () => {
		const expectedResult = new Error('Place must have an address');
		expect(() => {
			makePlace('test-id', 'test-name', undefined, undefined, 'test-provider');
		}).toThrow(expectedResult);
	});

	it('throws an error if provider is missing', () => {
		const expectedResult = new Error('Place must have a provider');
		expect(() => {
			makePlace('test-id', 'test-name', 'test-address', undefined, undefined);
		}).toThrow(expectedResult);
	});

	it('returns a frozen object if all requirements are passing', () => {
		const expectedResult = {
			id: 'test-id',
			name: 'test-name',
			address: 'test-address',
			location: {
				lat: 'test-lat',
				lng: 'test-lng',
			},
			provider: 'test-provider',
		};

		const place = makePlace(
			'test-id',
			'test-name',
			'test-address',
			{ lat: 'test-lat', lng: 'test-lng' },
			'test-provider'
		);
		expect(place).toEqual(expectedResult);
	});
});
