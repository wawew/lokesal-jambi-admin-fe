import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { store } from '../store/store';
import { Link } from "react-router-dom";
import '../styles/header.css';
import { GoSignOut } from "react-icons/go";

const Header = () => {
  return (
    <Container fluid className="header">
      <Row>
        <Col xs="auto" md="3" className="header-image">
          <img alt="logo" src={store.getState().logoKota} />
        </Col>
        <Col xs="auto" className="header-title">
          <h1>Kota {store.getState().namaKota}</h1>
          <p>{store.getState().tajukKota}</p>
        </Col>
        <Col xs="auto" className="header-keluar">
            <Link to='/masuk'><GoSignOut />Keluar</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;