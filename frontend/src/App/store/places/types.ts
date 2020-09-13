export const GET_PLACES = '@@places/GET_PLACES';
export const GET_PLACES_SUCCESS = '@@places/GET_PLACES_SUCCESS';
export const GET_PLACES_ERROR = '@@places/GET_PLACES_ERROR';

export interface ILocation {
	lat: string;
	lng: string;
}

export interface IPlace {
	id: string;
	provider: string;
	name: string;
	address: string;
	location?: ILocation;
}

export interface IGetPlaces {
	type: typeof GET_PLACES;
}

export interface IGetPlacesSuccess {
	type: typeof GET_PLACES_SUCCESS;
	payload: IPlace[];
}

export interface IGetPlacesError {
	type: typeof GET_PLACES_ERROR;
	payload: string;
}

export type DispatchTypes = IGetPlaces | IGetPlacesSuccess | IGetPlacesError;

export interface IPlacesState {
	loading: boolean;
	error?: string;
	places?: IPlace[];
}

export interface ISearchForm {
	name: string;
	lat: string;
	lng: string;
}

export interface IApiClient {
	get: (query: string) => Promise<any>;
}

export interface IApi {
	getPlaces: (payload: ISearchForm) => Promise<IPlace[]>;
}
