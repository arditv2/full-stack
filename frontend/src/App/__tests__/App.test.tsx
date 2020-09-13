import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';

describe('App component', () => {
	const initialProps = {
		loading: false,
		getPlaces: jest.fn(),
	};

	it('renders only Spinner when loading', () => {
		const props = { ...initialProps, loading: true };
		const wrapper = shallow(<App {...props} />);
		expect(wrapper.find('Spinner')).toHaveLength(1);
		expect(wrapper.find('SearchForm')).toHaveLength(0);
		expect(wrapper.find('PlacesList')).toHaveLength(0);
		expect(wrapper.find('Alert')).toHaveLength(0);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders SearchForm and Alert if there is an error', () => {
		const mockErrorMessage = 'Something failed';
		const props = { ...initialProps, error: mockErrorMessage };
		const wrapper = shallow(<App {...props} />);
		expect(wrapper.find('Spinner')).toHaveLength(0);
		expect(wrapper.find('SearchForm')).toHaveLength(1);
		expect(wrapper.find('PlacesList')).toHaveLength(0);
		const alert = wrapper.find('Alert');
		expect(alert).toHaveLength(1);
		expect(alert.text()).toEqual(mockErrorMessage);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders SearchForm and Alert if there are no places found', () => {
		const alertMessage = 'There are no places related to your search';
		const props = { ...initialProps, places: [] };
		const wrapper = shallow(<App {...props} />);
		expect(wrapper.find('Spinner')).toHaveLength(0);
		expect(wrapper.find('SearchForm')).toHaveLength(1);
		expect(wrapper.find('PlacesList')).toHaveLength(0);
		const alert = wrapper.find('Alert');
		expect(alert).toHaveLength(1);
		expect(alert.text()).toEqual(alertMessage);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders SearchForm and places list if there are places', () => {
		const props = {
			...initialProps,
			places: [
				{
					id: 'mock-id',
					provider: 'mock-provider',
					name: 'mock-name',
					address: 'mock-address',
				},
			],
		};
		const wrapper = shallow(<App {...props} />);
		expect(wrapper.find('Spinner')).toHaveLength(0);
		expect(wrapper.find('SearchForm')).toHaveLength(1);
		expect(wrapper.find('Alert')).toHaveLength(0);
		expect(wrapper.find('PlacesList')).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	});
});
