import React, { FC } from 'react';
import { IPlace } from '../App/store/places/types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface IProps {
  places: IPlace[];
}

const PlacesList: FC<IProps> = ({ places }) => {
  return (
    <Container fluid className="mb-3 p-0">
      <Row>
        {Boolean(places.length) &&
          places.map((place) => (
            <Col key={place.id} sm="12" md="6" className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {place.location && (
                      <Card.Text data-test-id="locationText">
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
