import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { store } from '../store/store';
import { Link } from "react-router-dom";
import '../styles/header.css';
import { GoSignOut } from "react-icons/go";
import logo from '../images/LOKESALtransparent.png';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Container fluid className="header">
      <Row style={{marginTop:'30px', marginBottom:'30px'}} className="align-items-center">
        <Col xs="12" md="5" className="header-image">
          <img alt="logo" src={logo} height='70'/>
        </Col>
        <Col xs="auto">
          <Navbar.Brand link="/">
            <img
              alt="logo"
              src={store.getState().logoKota}
              height="40"
              className="d-inline-block align-top"
            />
            <span style={{marginTop:"70px"}}>{' '}Kota {store.getState().namaKota}</span>
          </Navbar.Brand>
        </Col>
        <Col xs="auto" className="header-keluar">
            <Link to='/admin/masuk' style={{color:'black'}}><GoSignOut />Keluar</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;