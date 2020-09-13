import React, { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { ISearchForm } from '../App/store/places/types';

interface IProps {
	handleSubmit: (payload: ISearchForm) => void;
}

const initialState: ISearchForm = {
	name: '',
	lat: '',
	lng: '',
};

const SearchForm: FC<IProps> = ({ handleSubmit }) => {
	const [state, setState] = useState<ISearchForm>(initialState);
	return (
		<Form className='mt-3 mb-3'>
			<Form.Group controlId='formPlaceName'>
				<Form.Label>Place name</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter place name'
					data-test-id='nameInput'
					value={state.name}
					onChange={(e) =>
						setState({
							...state,
							name: e.target.value,
						})
					}
				/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col} md='6' controlId='formLat'>
					<Form.Label>Latitude</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter latitude'
						data-test-id='latInput'
						value={state.lat}
						onChange={(e) =>
							setState({
								...state,
								lat: e.target.value,
							})
						}
					/>
				</Form.Group>
				<Form.Group as={Col} md='6' controlId='formLng'>
					<Form.Label>Longitude</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter longitude'
						data-test-id='lngInput'
						value={state.lng}
						onChange={(e) =>
							setState({
								...state,
								lng: e.target.value,
							})
						}
					/>
				</Form.Group>
			</Form.Row>
			<Button
				variant='primary'
				type='button'
				onClick={() => handleSubmit(state)}
			>
				Search
			</Button>
		</Form>
	);
};

export default SearchForm;
