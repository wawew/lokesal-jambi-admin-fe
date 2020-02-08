import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";
import StatusKeluhan from "../components/keluhan";
import mapboxgl from 'mapbox-gl';
import Peta from "../components/peta";
import '../styles/peta.css';

mapboxgl.accessToken = store.getState().mapboxKey;

class DetailKeluhan extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman detail keluhan
    state = {
        detailKeluhan: [],
        idKeluhan: '',
        longitude: 0,
        latitude: 0,
        memuatPeta: false
    }

    componentDidMount = async() => {
        this.setState({ memuatPeta: true })
        const idKeluhan = this.props.match.params.id

        // fungsi untuk menampilkan detail keluhan dengan id tertentu
        const req = {
            method: 'get',
            url: `https://api.lokesal.online/keluhan/${idKeluhan}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            };

        await axios(req)
            .then((response) => {
            this.setState({ 
                detailKeluhan: response.data,
                longitude: response.data.longitude, 
                latitude: response.data.latitude,
                memuatPeta: false })
            console.log('ini respons', response.data)
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
            <NavigasiAdmin 
                keluhan={true} 
                berita={false} 
                pengguna={false} 
                komentar={false} 
                kustomisasi={false} 
            />
            <StatusKeluhan 
                fotoSebelum={this.state.detailKeluhan.foto_sebelum}
                namaDepan={this.state.detailKeluhan.nama_depan}
                namaBelakang={this.state.detailKeluhan.nama_belakang}
                diperbarui={this.state.detailKeluhan.diperbarui}
                status={this.state.detailKeluhan.status}
                isi={this.state.detailKeluhan.isi}
            />
            <Container style={{marginTop:"30px", marginBottom:"30px"}}>
                {this.state.memuatPeta ?
                <div>
                    
                </div>:
                <Peta longitude={this.state.longitude} latitude={this.state.latitude} />
            }
            </Container>
            <Container style={{marginTop: '30px'}}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Isi Tanggapan Admin: </Form.Label>
                    <Form.Control as="textarea" rows="5" />
                </Form.Group>
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("mapboxKey, longitude, latitude, memuatPeta", actions)(withRouter(DetailKeluhan));