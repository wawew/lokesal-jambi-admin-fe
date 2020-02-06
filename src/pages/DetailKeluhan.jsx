import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";
import { Container, Row } from "react-bootstrap";

class DetailKeluhan extends Component {
    state = {
        detailKeluhan: [],
        idKeluhan: ''
    }

    componentDidMount = () => {
        const idKeluhan = this.props.match.params.id

        // fungsi untuk menampilkan detail keluhan dengan id tertentu
        const req = {
            method: 'get',
            url: `https://api.lokesal.online/keluhan/${idKeluhan}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            };

        axios(req)
            .then((response) => {
            this.setState({ 'detailKeluhan': response.data })
            // console.log('ini respons', this.state.detailKeluhan)
        })
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.props.history.push("/masuk")
    }

    render() {
        return (
        <React.Fragment>
            <Header penangananKeluar={this.penangananKeluar}/>
            <NavigasiAdmin keluhan={true} berita={false} pengguna={false} komentar={false} kustomisasi={false} />
            <Container className='detail-keluhan' style={{marginTop:'50px'}}>
                <Row style={{ textAlign: "center", width: "100%", height: "350px" }}>
                    <img style={{ width: "380px", height: "320px", borderRadius: "10px" }} src={this.state.detailKeluhan.foto_sebelum} className="fotoSebelum" alt="" />
                </Row>
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(DetailKeluhan));