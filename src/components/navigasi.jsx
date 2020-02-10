import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { GiBookmarklet } from "react-icons/gi";
import { FaUsersCog } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
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
            <Col xs={12} md={4}
              className={props.keluhan ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/")}
            >
              <h6><GiBookmarklet style={{paddingBottom:"1px"}}/> Keluhan</h6>
            </Col>
            <Col xs={12} md={4}
              className={props.pengguna ? "navbar-aktif" : "navbar-nonaktif"} 
              onClick={() => props.history.push("/pengguna")}
            >
              <h6><FaUsersCog style={{paddingBottom:"4px"}}/> Pengguna</h6>
            </Col>
            <Col xs={12} md={4}
              className={props.komentar ? "navbar-aktif" : "navbar-nonaktif"}
              onClick={() => props.history.push("/komentar")}
            >
              <h6><FaComments style={{paddingBottom:"4px"}}/> Komentar</h6>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default withRouter(NavigasiAdmin);