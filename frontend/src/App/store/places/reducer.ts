import { Reducer } from 'redux';
import {
	IPlacesState,
	GET_PLACES,
	GET_PLACES_SUCCESS,
	GET_PLACES_ERROR,
	DispatchTypes,
} from './types';

const initialState: IPlacesState = {
	loading: false,
};

export const placesReducer: Reducer<IPlacesState> = (
	state: IPlacesState = initialState,
	action: DispatchTypes
): IPlacesState => {
	switch (action.type) {
		case GET_PLACES:
			return {
				loading: true,
			};
		case GET_PLACES_SUCCESS:
			return {
				loading: false,
				places: action.payload,
			};
		case GET_PLACES_ERROR:
			return {
				loading: false,
				error: action.payload,
				places: [],
			};
		default:
			return state;
	}
};
