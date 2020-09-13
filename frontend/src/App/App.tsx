import React, { FC } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { getPlacesAction } from './store/places/actions';
import { IPlace, ISearchForm } from './store/places/types';
import { RootReducerType } from '../configureStore';

import SearchForm from '../Components/SearchForm';
import PlacesList from '../Components/PlacesList';

import styles from './App.module.scss';

interface StateProps {
	loading: boolean;
	error?: string;
	places?: IPlace[];
}

interface DispatchProps {
	getPlaces: (payload: ISearchForm) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

export const App: FC<Props> = ({ loading, error, places, getPlaces }) => (
	<Container fluid className='mb-3'>
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				{loading && (
					<Container fluid className={styles.spinner_container}>
						<Spinner animation='border' variant='primary' />
					</Container>
				)}
				{!loading && <SearchForm handleSubmit={getPlaces} />}
				{!loading && !error && places && Boolean(places.length) && (
					<PlacesList places={places} />
				)}
				{!loading && !error && places && Boolean(!places.length) && (
					<Alert variant='info'>
						There are no places related to your search
					</Alert>
				)}
				{!loading && error && <Alert variant='danger'>{error}</Alert>}
			</Col>
		</Row>
	</Container>
);

const mapState = (state: RootReducerType) => ({
	loading: state.places.loading,
	error: state.places.error,
	places: state.places.places,
});

const mapDispatch = {
	getPlaces: (payload: ISearchForm) => getPlacesAction(payload),
};

export default connect(mapState, mapDispatch)(App);
