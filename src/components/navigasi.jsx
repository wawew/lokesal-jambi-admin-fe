import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import '../styles/navigasi.css';
import Navbar from 'react-bootstrap/Navbar';

// component stateless untuk menampilkan navigasi admin di setiap halaman
const NavigasiAdmin = props => {
  return (
    <Container fluid 
      style={{borderBottom:"1px solid green"}}
    >
      <Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className="navbar-row">
            <Col
              className={props.keluhan ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/")}
            >
              <h6>KELUHAN</h6>
            </Col>
            <Col 
              className={props.berita ? "navbar-aktif" : "navbar-nonaktif"} 
              onClick={() => props.history.push("/berita")}
            >
              <h6>BERITA</h6>
            </Col>
            <Col 
              className={props.pengguna ? "navbar-aktif" : "navbar-nonaktif"} 
              onClick={() => props.history.push("/pengguna")}
            >
              <h6>PENGGUNA</h6>
            </Col>
            <Col 
              className={props.komentar ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/komentar")}
            >
              <h6>KOMENTAR</h6>
            </Col>
            <Col 
              className={props.kustomisasi ? "navbar-aktif" : "navbar-nonaktif"} 
              onClick={() => props.history.push("/kustomisasi")}
            >
              <h6>KUSTOMISASI</h6>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default withRouter(NavigasiAdmin);