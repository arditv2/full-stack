import React, { FC } from 'react';
import { IPlace } from '../App/store/places/types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface IProps {
	places: IPlace[];
}

// const PlacesList: FC<IProps> = ({ places }) => {
// 	return (
// 		<Table striped bordered hover className='mt-3'>
// 			<thead>
// 				<tr>
// 					<th>#</th>
// 					<th>Name</th>
// 					<th>Address</th>
// 					<th>Location</th>
// 					<th>Provider</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{places.map((place, index) => (
// 					<tr key={place.id}>
// 						<td id='number'>{index + 1}</td>
// 						<td id='name'>{place.name}</td>
// 						<td id='address'>{place.address}</td>
// 						<td id='location'>
// 							{place.location ? (
// 								<>
// 									<span>
// 										<b>Lat:</b> {place.location.lat}
// 									</span>
// 									<br />
// 									<span>
// 										<b>Long:</b> {place.location.lng}
// 									</span>
// 								</>
// 							) : (
// 								'-'
// 							)}
// 						</td>
// 						<td id='provider'>{place.provider}</td>
// 					</tr>
// 				))}
// 			</tbody>
// 		</Table>
// 	);
// };
const PlacesList: FC<IProps> = ({ places }) => {
	return (
		<Container fluid className='mb-3 p-0'>
			<Row>
				{Boolean(places.length) &&
					places.map((place) => (
						<Col key={place.id} sm='12' md='6' className='mb-3'>
							<Card className='h-100'>
								<Card.Body>
									<Card.Title>{place.name}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										{place.location && (
											<Card.Text data-test-id='locationText'>
												Lat: {String(place.location.lat).substring(0, 9)} Lng:{' '}
												{String(place.location.lng).substring(0, 9)}
											</Card.Text>
										)}
									</Card.Subtitle>
									<Card.Text>{place.address}</Card.Text>
								</Card.Body>
								<Card.Footer>{place.provider}</Card.Footer>
							</Card>
						</Col>
					))}
			</Row>
		</Container>
	);
};

export default PlacesList;
