import axios from 'axios';
import { IPlace, IApi, IApiClient, ISearchForm } from './types';
import config from '../../../config';

const instance: IApiClient = axios.create({
	baseURL: `${config.api.host}${config.api.basePath}`,
	timeout: config.api.timeout,
});

export const makeApi = (client: IApiClient): IApi => ({
	getPlaces: async (payload: ISearchForm) => {
		const { name, lat, lng } = payload;
		const query: string = `/places?provider=google&name=${encodeURI(
			name
		)}`.concat(lat && `&lat=${lat}`, lng && `&lng=${lng}`);
		const response = await client.get(query);
		return response.data as IPlace[];
	},
});

const Api: IApi = makeApi(instance);

export default Api;
