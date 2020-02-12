import React from 'react';
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";

// component stateless untuk menampilkan isi detail keluhan dengan sesuai status keluhan
const Penomoran = props => {
  return (
    <Container style={{textAlign:"center", marginBottom:"30px"}}>
        <h6>
            {props.halaman === 1
            ? <React.Fragment>
                <FaAngleDoubleLeft 
                    style={{paddingBottom:"3px", color:"gray"}}
                />
                <FaAngleLeft 
                    style={{paddingBottom:"3px", color:"gray"}}
                />
                </React.Fragment>
            : <React.Fragment>
                <FaAngleDoubleLeft 
                    style={{paddingBottom:"3px", cursor:"pointer", color:"green"}}
                    onClick={() => props.pertama()}
                />
                <FaAngleLeft 
                    style={{paddingBottom:"3px", cursor:"pointer", color:"green"}}
                    onClick={() => props.sebelumnya()}
                />
                </React.Fragment>
            }
            {" "}Halaman {props.halaman} dari {props.totalHalaman}{" "}
            { props.halaman === props.totalHalaman
            ? <React.Fragment>
                <FaAngleRight
                    style={{paddingBottom:"3px", color:"gray"}}
                />
                <FaAngleDoubleRight
                    style={{paddingBottom:"3px", color:"gray"}}
                />
                </React.Fragment>
            : <React.Fragment>
                <FaAngleRight 
                    style={{paddingBottom:"3px", cursor:"pointer", color:"green"}}
                    onClick={() => props.selanjutnya()}
                />
                <FaAngleDoubleRight 
                    style={{paddingBottom:"3px", cursor:"pointer", color:"green"}}
                    onClick={() => props.terakhir()}
                />
                </React.Fragment>
            }
        </h6>
    </Container>
  );
}

export default withRouter(Penomoran);