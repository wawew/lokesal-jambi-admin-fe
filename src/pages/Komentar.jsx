import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container } from "react-bootstrap";
import Header from "../components/header";
import NavigasiAdmin from "../components/navigasi";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import '../styles/komentar.css';


class Komentar extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman komentar
    state = {
        halaman: '',
        perHalaman: '',
        totalHalaman: '',
        memuat: false,
        komentar: [],
        komentarHeader: [{ 
            ID: '',  
            Email: '', 
            Laporan: '', 
            Diperbarui: '',
            Hapus: ''
        }]
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }

        // fungsi untuk menampilkan seluruh data komentar
        const req = {
        method: 'get',
        url: `https://api.lokesal.online/komentar?${
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
            'komentar': response.data.daftar_komentar
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

    // membuat header untuk tabel komentar
    renderTabelHeader() {
        let header = Object.keys(this.state.komentarHeader[0])
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
                pengguna={false} 
                komentar={true} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px'}}>
                <h3 id='title'>Tabel Komentar {store.getState().namaKota}</h3>
                <Table id='komentar'>
                    <Thead>
                        <Tr>
                        {this.renderTabelHeader()}
                        </Tr>
                    </Thead>
                    {/* <Tbody>
                        {this.state.komentar.map((item) => (
                        <BarisKomentar 
                            id={item.detail_komentar.id} 
                            email={item.detail_komentar.email}
                            laporan={item.detail_komentar.laporan}
                            diperbarui={item.detail_komentar.diperbarui}
                        />
                        ))}
                    </Tbody> */}
                </Table>
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Komentar));