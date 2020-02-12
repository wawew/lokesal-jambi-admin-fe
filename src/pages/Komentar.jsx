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
import BarisKomentar from "../components/barisKomentar";
import '../styles/komentar.css';

class Komentar extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman komentar
    state = {
        halaman: '',
        perHalaman: '',
        totalHalaman: '',
        memuat: false,
        totalKomentar: '',
        komentar: [],
        komentarHeader: [{ 
            ID: '',  
            Nama: '',
            Email: '', 
            Laporan: '', 
            Diperbarui: '',
            Hapus: ''
        }]
    }

    // fungsi menampilkan baris komentar
    mapKomentar = () => {
        console.log('ini respons komentar', this.state.komentar)
        return (
            this.state.komentar.map((item) => (
                <BarisKomentar 
                    dapatKomentar={this.dapatKomentar}
                    id={item.detail_komentar.id} 
                    namaDepan={item.nama_depan}
                    namaBelakang={item.nama_belakang}
                    email={item.email}
                    isi={item.detail_komentar.isi}
                    diperbarui={item.detail_komentar.diperbarui}
                    dilaporkan={item.detail_komentar.total_dilaporkan}
                />
            ))
        )
    }
    
    // fungsi untuk menampilkan seluruh data komentar
    dapatKomentar = async () => {
        this.setState({memuat: true})
        const req = {
            method: 'get',
            url: `https://api.lokesal.online/admin/keluhan/komentar?${
                    this.state.halaman === '' ? '' : `halaman=${this.state.halaman}`
                    }&${
                        this.state.perHalaman === '' ? '' : `per_halaman=${this.state.perHalaman}`
                        }`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            params: {kota: store.getState().namaKota}
            };
    
        await axios(req)
            .then((response) => {
            this.setState({
                'halaman': response.data.halaman,
                'perHalaman': response.data.per_halaman,
                'totalHalaman': response.data.totaal_halaman,
                'totalKomentar': response.data.total_komentar,
                'komentar': response.data.daftar_komentar,
                'memuat': false
            })
        })
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }
        this.dapatKomentar()
    }

     // fungsi keluar dari akun admin
     penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        swal("LOKESAL ADMIN", "Admin keluar dari aplikasi.", "success");
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
            <Container style={{marginTop:'50px', marginBottom:'10px', textAlign:"center"}}>
                <h3 id='title'>Tabel Komentar {store.getState().namaKota}</h3>
                {this.state.memuat ? (
                    <Spinner animation="grow" variant="success" />
                ) : (
                    <Table id='komentar'>
                        <Thead>
                            <Tr>
                            {this.renderTabelHeader()}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.mapKomentar()}
                        </Tbody>
                    </Table>
                )}
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Komentar));