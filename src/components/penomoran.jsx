import React from 'react';
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

// component stateless untuk menampilkan isi detail keluhan dengan sesuai status keluhan
const Penomoran = props => {
  return (
    <Container style={{textAlign:"center"}}>
        <h6>
            <FaAngleDoubleLeft 
                style={{paddingBottom:"3px", cursor:"pointer"}}
                onClick={() => props.pertama()}
            />
            <FaAngleLeft 
                style={{paddingBottom:"3px", cursor:"pointer"}}
                onClick={() => props.sebelumnya()}
            />
            {" "}Halaman {props.halaman} dari {props.totalHalaman}{" "}
            <FaAngleRight 
                style={{paddingBottom:"3px", cursor:"pointer"}}
                onClick={() => props.selanjutnya()}
            />
            <FaAngleDoubleRight 
                style={{paddingBottom:"3px", cursor:"pointer"}}
                onClick={() => props.terakhir()}
            />
        </h6>
    </Container>
  );
}

export default withRouter(Penomoran);