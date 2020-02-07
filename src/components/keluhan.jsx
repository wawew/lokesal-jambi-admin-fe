import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiPlainCircle } from "react-icons/gi";

// component stateless untuk menampilkan isi detail keluhan dengan sesuai status keluhan
const StatusKeluhan = props => {
  return (
    <Container className='detail-keluhan' style={{marginTop:'50px'}}>
        <Row>
          <Col style={{textAlign:'center'}}>
            <img style={{ 
              width: "250px", 
              height: "250px", 
              borderRadius: "10px", 
              objectFit:'cover', 
              textAlign:'center', 
              marginBottom:'30px' 
              }} 
              src={props.fotoSebelum} 
              className="fotoSebelum" 
              alt="fotoSebelum" 
            />
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <span>Nama: {props.namaDepan+' '+props.namaBelakang}</span><br />
            <span>Diperbarui: {props.diperbarui}</span>
          </Col>
          <Col xs="auto" 
            style={{
              marginLeft:"auto", 
              paddingTop:"7px", 
              fontSize:"20px"
            }}
          >
            <span>
              <strong>STATUS: </strong>
              <GiPlainCircle style={{paddingBottom:"5px"}} className={
                props.status === "diterima" ? "text-danger" 
                : props.status === "diproses" ? "text-warning"
                : "text-success"
              }/> 
              KELUHAN {props.status}
            </span>
          </Col>
        </Row>
        <Row style={{marginTop:"30px"}}>
          <Col>
            <span>{props.isi}</span>
          </Col>
        </Row>
    </Container>
  );
}

export default withRouter(StatusKeluhan);