import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import '../styles/navigasi.css';
import Navbar from 'react-bootstrap/Navbar';

const NavigasiAdmin = props => {
  return (
    <Container fluid style={{borderBottom:"1px solid gray"}}>
      <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Row className="navbar-row">
        <Col>
          <h6>KELUHAN</h6>
        </Col>
        <Col>
          <h6>BERITA</h6>
        </Col>
        <Col>
          <h6>PENGGUNA</h6>
        </Col>
        <Col>
          <h6>KOMENTAR</h6>
        </Col>
        <Col>
          <h6>KUSTOMISASI</h6>
        </Col>
      </Row>
      </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default withRouter(NavigasiAdmin);