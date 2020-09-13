import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeGetPlacesAction } from '../actions';
import { IApi, ISearchForm, IPlace } from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getPlacesAction', () => {
	const MockPlace: IPlace = {
		id: 'test-id',
		provider: 'test-provider',
		name: 'test-name',
		address: 'test-address',
	};
	const mockPayload: ISearchForm = {
		name: 'test',
		lat: '',
		lng: '',
	};
	let store: MockStoreEnhanced<any, any>;
	beforeEach(() => {
		store = mockStore({ places: {} });
	});

	it('dispatches GET_PLACES and GET_PLACES_SUCCESS if api returns a response', async (done) => {
		const expectedActions = [
			{
				type: '@@places/GET_PLACES',
			},
			{
				type: '@@places/GET_PLACES_SUCCESS',
				payload: [MockPlace],
			},
		];

		const MockApi: IApi = {
			getPlaces: async (): Promise<IPlace[]> => [MockPlace],
		};
		const getPlacesAction = makeGetPlacesAction(MockApi);
		await store.dispatch(getPlacesAction(mockPayload));

		expect(store.getActions()).toEqual(expectedActions);
		done();
	});

	it('dispatches GET_PLACES and GET_PLACES_ERROR if api returns an error', async (done) => {
		const expectedActions = [
			{
				type: '@@places/GET_PLACES',
			},
			{
				type: '@@places/GET_PLACES_ERROR',
				payload: 'Mock error',
			},
		];

		const MockApi: IApi = {
			getPlaces: async (): Promise<IPlace[]> => {
				throw new Error('Mock error');
			},
		};
		const getPlacesAction = makeGetPlacesAction(MockApi);
		await store.dispatch(getPlacesAction(mockPayload));

		expect(store.getActions()).toEqual(expectedActions);
		done();
	});
});
