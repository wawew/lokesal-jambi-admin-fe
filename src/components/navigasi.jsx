import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import '../styles/navigasi.css';

const NavigasiAdmin = props => {
  return (
    <Container>
      <Row className="navbar-row">
        <Col>
          <h5>KELUHAN</h5>
        </Col>
        <Col>
          <h5>BERITA</h5>
        </Col>
        <Col>
          <h5>PENGGUNA</h5>
        </Col>
        <Col>
          <h5>KOMENTAR</h5>
        </Col>
        <Col>
          <h5>KUSTOMISASI</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(NavigasiAdmin);