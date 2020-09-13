import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlacesList from '../PlacesList';

describe('PlacesList', () => {
	it('renders no cards when places is empty', () => {
		const wrapper: ShallowWrapper = shallow(<PlacesList places={[]} />);
		expect(wrapper.find('Card')).toHaveLength(0);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders a card when places contains one element', () => {
		const wrapper: ShallowWrapper = shallow(
			<PlacesList
				places={[
					{
						id: 'mock-id',
						provider: 'mock-provider',
						name: 'mock-name',
						address: 'mock-address',
						location: { lat: 'mock-lat', lng: 'mock-lng' },
					},
				]}
			/>
		);
		expect(wrapper.find('Card')).toHaveLength(1);
		expect(wrapper.find('CardText[data-test-id="locationText"]')).toHaveLength(
			1
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders a card when places contains one element without location', () => {
		const wrapper: ShallowWrapper = shallow(
			<PlacesList
				places={[
					{
						id: 'mock-id',
						provider: 'mock-provider',
						name: 'mock-name',
						address: 'mock-address',
					},
				]}
			/>
		);
		expect(wrapper.find('Card')).toHaveLength(1);
		expect(wrapper.find('CardText[data-test-id="locationText"]')).toHaveLength(
			0
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders multiple cards when places contains more than one elemen', () => {
		const wrapper: ShallowWrapper = shallow(
			<PlacesList
				places={[
					{
						id: 'mock-id',
						provider: 'mock-provider',
						name: 'mock-name',
						address: 'mock-address',
					},
					{
						id: 'mock-id2',
						provider: 'mock-provider',
						name: 'mock-name2',
						address: 'mock-address2',
					},
				]}
			/>
		);
		expect(wrapper.find('Card')).toHaveLength(2);
		expect(wrapper).toMatchSnapshot();
	});
});
