import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { GiPlainCircle } from "react-icons/gi";
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";

// component stateless untuk menampilkan isi detail keluhan dengan sesuai status keluhan
const StatusKeluhan = props => {
  return (
    <Container className='detail-keluhan' style={{marginTop:'50px'}}>
        <Row>
          <Col xs={12} md={6} style={{textAlign:'center'}}>
            <Image style={{ 
              width: "100%", 
              height: "300px", 
              borderRadius: "10px", 
              objectFit:'cover', 
              textAlign:'center', 
              marginBottom:'30px' 
              }} 
              src={props.fotoSebelum} 
              className="fotoSebelum" 
              alt="fotoSebelum"
              fluid 
            />
          </Col>
          <Col xs={12} md={6} style={{textAlign:'center'}}>
            <Image style={{ 
              width: "100%", 
              height: "300px", 
              borderRadius: "10px", 
              objectFit:'cover', 
              textAlign:'center', 
              marginBottom:'30px' 
              }} 
              src='https://placehold.it/540x300/171717/2F2F2F' 
              className="fotoSebelum" 
              alt="fotoSebelum"
              fluid 
            />
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <span>Nama: <strong>{props.namaDepan+' '+props.namaBelakang}</strong></span>
            <br />
            <span>Diperbarui:{" "}
              {moment(`${props.diperbarui}Z`)
                  .tz("Asia/Jakarta")
                  .format("LL")}{", "}
              {moment(`${props.diperbarui}Z`).format("hh:mm")} WIB
            </span>
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
          <Col xs={12}>
            <span><strong>ISI KELUHAN: </strong></span>
          </Col>
          <Col xs={12}>
            <span>{props.isi}</span>
          </Col>
        </Row>
    </Container>
  );
}

export default withRouter(StatusKeluhan);