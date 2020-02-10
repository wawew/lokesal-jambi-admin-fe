import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import Header from "../components/header";
import NavigasiAdmin from "../components/navigasi";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import { Spinner, Container } from "react-bootstrap";
import swal from "sweetalert";
import BarisPengguna from "../components/barisPengguna";
import '../styles/pengguna.css';


class Pengguna extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman pengguna
    state = {
        halaman: '',
        perHalaman: '',
        totalHalaman: '',
        memuat: true,
        pengguna: [],
        penggunaHeader: [{ 
            ID: '', 
            Nama: '', 
            Email: '', 
            Telepon: '', 
            Diperbarui: '',
            Status: '',
            Verifikasi: ''
        }]
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }

        // fungsi untuk menampilkan seluruh data pengguna
        const req = {
        method: 'get',
        url: `https://api.lokesal.online/admin/pengguna?${
                this.state.halaman === '' ? '' : `halaman=${this.state.halaman}`
                }&${
                    this.state.perHalaman === '' ? '' : `per_halaman=${this.state.perHalaman}`
                    }`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: {kota: store.getState().namaKota}
        };

        axios(req)
        .then((response) => {
        this.setState({
            'memuat':false,
            'halaman': response.data.halaman,
            'perHalaman': response.data.per_halaman,
            'totalHalaman': response.data.totaal_halaman,
            'pengguna': response.data.daftar_pengguna
        })
        console.log('ini respons pengguna', response.data)
        })
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        swal("LOKESAL ADMIN", "Admin keluar dari aplikasi.", "success");
        this.props.history.push("/masuk")
    }

    // membuat header untuk tabel pengguna
    renderTabelHeader = () => {
        let header = Object.keys(this.state.penggunaHeader[0])
        return header.map((key, index) => {
        return <Th key={index}>{key.toUpperCase()}</Th>
        })
    }
        
    render() {
        return (
        <React.Fragment>
            <Header penangananKeluar={this.penangananKeluar}/>
            <NavigasiAdmin 
                keluhan={false} 
                pengguna={true} 
                komentar={false} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px', textAlign:"center"}}>
                <h3 id='title'>Tabel Pengguna {store.getState().namaKota}</h3>
                {this.state.memuat ? (
                    <Spinner animation="grow" variant="success" />
                ) : (
                    <Table id='pengguna'>
                        <Thead>
                            <Tr>
                            {this.renderTabelHeader()}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.state.pengguna.map((item, index) => (
                                <BarisPengguna 
                                    id={item.id} 
                                    indexPengguna={index}
                                    namaDepan={item.nama_depan}
                                    namaBelakang={item.nama_belakang}
                                    email={item.email}
                                    telepon={item.telepon}
                                    diperbarui={item.diperbarui}
                                    aktif={item.aktif}
                                    terverifikasi={item.terverifikasi}
                                />
                                ))}
                        </Tbody>
                    </Table>
                )}
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Pengguna));