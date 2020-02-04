import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainRoute from './route/MainRoute';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col className="App">
          <MainRoute />
        </Col>
      </Row>
    </Container>
  );
}

export default App;