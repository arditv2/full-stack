import { placesReducer } from '../reducer';
import {
	IPlacesState,
	GET_PLACES,
	GET_PLACES_SUCCESS,
	GET_PLACES_ERROR,
} from '../types';

describe('placesReducer', () => {
	const initialState: IPlacesState = {
		loading: false,
	};
	let state;

	it('returns an initial state', () => {
		state = placesReducer(undefined, { type: 'NON_MATCHING' });
		expect(state).toEqual(initialState);
	});

	it('returns state when a non matching actionType is dispatched', () => {
		state = placesReducer(initialState, { type: 'NON_MATCHING' });
		expect(state).toEqual(initialState);
	});

	it('returns state when GET_PLACES actionType is dispatched', () => {
		const expectedResult = {
			loading: true,
		};
		state = placesReducer(state, { type: GET_PLACES });
		expect(state).toEqual(expectedResult);
	});

	it('returns state when GET_PLACES_SUCCESS actionType is dispatched', () => {
		const expectedResult = {
			loading: false,
			places: [{}],
		};
		state = placesReducer(state, { type: GET_PLACES_SUCCESS, payload: [{}] });
		expect(state).toEqual(expectedResult);
	});

	it('returns state when GET_PLACES_ERROR actionType is dispatched', () => {
		const expectedResult = {
			loading: false,
			error: 'mockError',
			places: [],
		};
		state = placesReducer(state, {
			type: GET_PLACES_ERROR,
			payload: 'mockError',
		});
		expect(state).toEqual(expectedResult);
	});
});
