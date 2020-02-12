import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiPlainCircle } from "react-icons/gi";
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";

// component stateless untuk menampilkan isi detail keluhan dengan sesuai status keluhan
const StatusKeluhan = props => {
  return (
    <Container className='detail-keluhan' style={{marginTop:'30px'}}>
      <Row>
        <Col xs="auto">
          <span>Nama: <strong>{props.namaDepan+' '+props.namaBelakang}</strong></span>
          <br />
          <span>Diperbarui:{" "}
            {moment(`${props.diperbarui}Z`)
                .tz("Asia/Jakarta")
                .format("LL")}{", "}
            {moment(`${props.diperbarui}Z`).format("HH:mm")} WIB
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