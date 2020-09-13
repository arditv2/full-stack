import { makeApi } from '../api';
import { IApiClient, ISearchForm } from '../types';

describe('Api', () => {
	const mockResponse = [{ id: 'test-id', provider: 'test-provider' }];
	const mockInstance: IApiClient = {
		get: () =>
			Promise.resolve({
				data: mockResponse,
			}),
	};
	const api = makeApi(mockInstance);

	it('returns clients response', async (done) => {
		const mockPayload: ISearchForm = {
			name: 'test',
			lat: 'test-lat',
			lng: 'test-lng',
		};
		const response = await api.getPlaces(mockPayload);
		expect(response).toEqual(mockResponse);
		done();
	});
});
