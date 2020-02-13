import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { GiBookmarklet } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";
import { FaUsersCog, FaComments, FaHome } from "react-icons/fa";
import logo from '../images/Logojambi.jpg';
import '../styles/navBar.css';

// component stateless untuk menampilkan navigasi admin di setiap halaman
const NavbarAdmin = props => {
  return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand style={{marginLeft: "10px"}}>
                <img
                    alt=""
                    src={logo}
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                <strong>Kota Jambi</strong>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link 
                        className={props.beranda ? "navbar-aktif" : "navbar-nonaktif"}
                        onClick={() => props.history.push("/")}
                        style={{cursor:"pointer"}}> 
                        <span><FaHome style={{paddingBottom:"1px"}}/> Beranda</span>
                    </Nav.Link>
                    <Nav.Link 
                        className={props.keluhan ? "navbar-aktif" : "navbar-nonaktif"}
                        onClick={() => props.history.push("/keluhan")}
                        style={{cursor:"pointer"}}> 
                        <span><GiBookmarklet style={{paddingBottom:"1px"}}/> Keluhan</span>
                    </Nav.Link>
                    <Nav.Link 
                        className={props.pengguna ? "navbar-aktif" : "navbar-nonaktif"}
                        onClick={() => props.history.push("/pengguna")}
                        style={{cursor:"pointer"}}> 
                        <span><FaUsersCog style={{paddingBottom:"1px"}}/> Pengguna</span>
                    </Nav.Link>
                    <Nav.Link 
                        className={props.komentar ? "navbar-aktif" : "navbar-nonaktif"}
                        onClick={() => props.history.push("/komentar")}
                        style={{cursor:"pointer"}}> 
                        <span><FaComments style={{paddingBottom:"1px"}}/> Komentar</span>
                    </Nav.Link>
                    <Nav.Link 
                        className={props.keluar ? "navbar-aktif" : "navbar-nonaktif"}
                        onClick={() => props.penangananKeluar()}
                        style={{cursor:"pointer"}}> 
                        <span><GoSignOut style={{paddingBottom:"1px"}}/> Keluar</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
}

export default withRouter(NavbarAdmin);