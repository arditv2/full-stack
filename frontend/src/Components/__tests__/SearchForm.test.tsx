import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ISearchForm } from '../../App/store/places/types';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
	const handleSubmit = jest.fn();
	let wrapper: ShallowWrapper;
	const setState = jest.fn();
	const useStateSpy = jest.spyOn(React, 'useState');
	useStateSpy.mockImplementation((state) => [state, setState]);

	beforeEach(() => {
		wrapper = shallow(<SearchForm handleSubmit={handleSubmit} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders nameInput FormControl', () => {
		expect(wrapper.find('FormControl[data-test-id="nameInput"]')).toHaveLength(
			1
		);
	});

	it('sets state when nameInput FormControl changes', () => {
		wrapper
			.find('FormControl[data-test-id="nameInput"]')
			.simulate('change', { target: { value: 'test-name' } });
		expect(
			wrapper.find('FormControl[data-test-id="nameInput"]').props().value
		).toEqual('test-name');
	});

	it('renders latInput FormControl', () => {
		expect(wrapper.find('FormControl[data-test-id="latInput"]')).toHaveLength(
			1
		);
	});

	it('sets state when latInput FormControl changes', () => {
		wrapper
			.find('FormControl[data-test-id="latInput"]')
			.simulate('change', { target: { value: 'test-lat' } });
		expect(
			wrapper.find('FormControl[data-test-id="latInput"]').props().value
		).toEqual('test-lat');
	});

	it('renders lngInput FormControl', () => {
		expect(wrapper.find('FormControl[data-test-id="lngInput"]')).toHaveLength(
			1
		);
	});

	it('sets state when lngInput FormControl changes', () => {
		wrapper
			.find('FormControl[data-test-id="lngInput"]')
			.simulate('change', { target: { value: 'test-lng' } });
		expect(
			wrapper.find('FormControl[data-test-id="lngInput"]').props().value
		).toEqual('test-lng');
	});

	it('renders a Button', () => {
		expect(wrapper.find('Button')).toHaveLength(1);
	});

	it('calls handleSubmit on Button click', () => {
		wrapper.find('Button').simulate('click');
		expect(handleSubmit).toHaveBeenCalled();
	});

	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
