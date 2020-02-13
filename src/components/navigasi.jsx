import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { GiBookmarklet } from "react-icons/gi";
import { FaUsersCog, FaComments, FaHome } from "react-icons/fa";
import '../styles/navigasi.css';

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
            <Col xs={12} md={3}
              className={props.beranda ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/")}
            >
              <h5><FaHome style={{paddingBottom:"1px"}}/> Beranda</h5>
            </Col>
            <Col xs={12} md={3}
              className={props.keluhan ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/keluhan")}
            >
              <h5><GiBookmarklet style={{paddingBottom:"1px"}}/> Keluhan</h5>
            </Col>
            <Col xs={12} md={3}
              className={props.pengguna ? "navbar-aktif" : "navbar-nonaktif"} 
              onClick={() => props.history.push("/pengguna")}
            >
              <h5><FaUsersCog style={{paddingBottom:"4px"}}/> Pengguna</h5>
            </Col>
            <Col xs={12} md={3}
              className={props.komentar ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/komentar")}
            >
              <h5><FaComments style={{paddingBottom:"4px"}}/> Komentar</h5>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default withRouter(NavigasiAdmin);