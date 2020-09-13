import { ThunkDispatch } from 'redux-thunk';

import {
	GET_PLACES,
	GET_PLACES_SUCCESS,
	GET_PLACES_ERROR,
	DispatchTypes,
	IGetPlaces,
	IGetPlacesSuccess,
	IGetPlacesError,
	IApi,
	ISearchForm,
} from './types';

import Api from './api';

export const makeGetPlacesAction = (Api: IApi) => (
	payload: ISearchForm
) => async (dispatch: ThunkDispatch<any, any, DispatchTypes>) => {
	try {
		dispatch<IGetPlaces>({
			type: GET_PLACES,
		});

		const places = await Api.getPlaces(payload);

		dispatch<IGetPlacesSuccess>({
			type: GET_PLACES_SUCCESS,
			payload: places,
		});
	} catch (error) {
		dispatch<IGetPlacesError>({
			type: GET_PLACES_ERROR,
			payload:
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message,
		});
	}
};

export const getPlacesAction = makeGetPlacesAction(Api);
