import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container } from "react-bootstrap";
import Header from "../components/header";
import NavigasiAdmin from "../components/navigasi";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import '../styles/berita.css';


class Berita extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman berita
    state = {
        halaman: '',
        perHalaman: '',
        totalHalaman: '',
        memuat: false,
        berita: [],
        beritaHeader: [{ ID: '', Judul: '', Disukai: '', Komentar: '', Dibuat: '' }]
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }

        // fungsi untuk menampilkan seluruh data berita
        const req = {
        method: 'get',
        url: `https://api.lokesal.online/berita?${
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
            'halaman': response.data.halaman,
            'perHalaman': response.data.per_halaman,
            'totalHalaman': response.data.totaal_halaman,
            'berita': response.data.daftar_berita
        })
        console.log('ini respons', response.data)
        })
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.props.history.push("/masuk")
    }

    // membuat header untuk tabel berita
    renderTabelHeader() {
        let header = Object.keys(this.state.beritaHeader[0])
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
                berita={true} 
                pengguna={false} 
                komentar={false} 
                kustomisasi={false} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px'}}>
                <h3 id='title'>Tabel Berita {store.getState().namaKota}</h3>
                <Table id='berita'>
                <Thead>
                    <Tr>
                    {this.renderTabelHeader()}
                    </Tr>
                </Thead>
                {/* <Tbody>
                    {this.state.berita.map((item) => (
                    <BarisBerita 
                        id={item.detail_berita.id} 
                        judul={item.detail_berita.judul}
                        disukai={item.detail_berita.disukai}
                        komentar={item.detail_berita.komentar}
                        dibuat={item.detail_berita.dibuat}
                    />
                    ))}
                </Tbody> */}
                </Table>
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Berita));