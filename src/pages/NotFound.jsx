import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/notFound.css";

const NotFound = props => {
    return (
        <Container className="page_404">
            <Row>
                <Col sm={12} md={12}>
                    <div className="col-sm-12 col-sm-offset-1  text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">404</h1>        
                        </div>
                        <div className="contant_box_404">
                            <h3 className="h2">Admin tersesat!</h3>
                            <h6>Maaf, halaman yang admin cari tidak ada ...</h6>
                            <span 
                                className="link_404" 
                                onClick={() => props.history.push("/")}
                                style={{cursor:"pointer"}}>
                                    Kembali ke Beranda
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(NotFound);