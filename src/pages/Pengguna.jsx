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
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import '../styles/pengguna.css';

class Pengguna extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman pengguna
    state = {
        halaman: 1,
        perHalaman: 10,
        totalHalaman: '',
        totalPengguna: '',
        memuat: false,
        kataKunci: '',
        statuAktif: '',
        statuVerifikasi: '',
        pengguna: []
    }

    // fungsi untuk menampilkan seluruh data pengguna
    dapatPengguna = () => {
        this.setState({memuat: true})
        const req = {
            method: 'get',
            url: 'https://api.lokesal.online/admin/pengguna',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            params: {
                kota: store.getState().namaKota,
                kata_kunci: this.state.kataKunci,
                status_aktif: this.state.statuAktif,
                statu_terverifikasi: this.state.statuVerifikasi,
                halaman: this.state.halaman,
                per_halaman: this.state.perHalaman,
                urutkan: this.state.urutkan,
                sortir: this.state.sortir
            }
        };
    
        axios(req)
            .then((response) => {
            this.setState({
                memuat: false,
                halaman: response.data.halaman,
                perHalaman: response.data.per_halaman,
                totalHalaman: response.data.total_halaman,
                totalPengguna: response.data.total_pengguna,
                pengguna: response.data.daftar_pengguna
            })
            console.log('ini respons pengguna', response.data)
        })
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }
        this.dapatPengguna()
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        swal("LOKESAL ADMIN", "Admin keluar dari aplikasi.", "success");
        this.props.history.push("/masuk")
    }
    
    // fungsi mengubah param untuk kebutuhan urutkan dan sortir
    ubahParamPengguna = (param) => {
        if(param === "diperbarui") {
        this.state.sortir === ""
        ? this.setState(
            {urutkan: "diperbarui", sortir: "naik"}, 
            () => this.dapatPengguna()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {urutkan: "diperbarui", sortir: "naik"}, 
                () => this.dapatPengguna()
            )
            : this.setState(
                {urutkan: "diperbarui", sortir: "turun"}, 
                () => this.dapatPengguna()
            )
        } else if(param === "dibuat") {
        this.state.sortir === ""
        ? this.setState(
            {urutkan: "dibuat", sortir: "naik"}, 
            () => this.dapatPengguna()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {urutkan: "dibuat", sortir: "naik"}, 
                () => this.dapatPengguna()
            )
            : this.setState(
                {urutkan: "dibuat", sortir: "turun"}, 
                () => this.dapatPengguna()
            )
        } else if(param === "nama") {
        this.state.sortir === ""
        ? this.setState(
            {urutkan: "nama", sortir: "naik"}, 
            () => this.dapatPengguna()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {urutkan: "nama", sortir: "naik"}, 
                () => this.dapatPengguna()
            )
            : this.setState(
                {urutkan: "nama", sortir: "turun"}, 
                () => this.dapatPengguna()
            )
        }
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
                                <Th>ID</Th>
                                <Th
                                onClick={()=>this.ubahParamPengguna("nama")}
                                style={{cursor:"pointer"}}>
                                    NAMA 
                                    {this.state.urutkan !== "nama"
                                        ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                                        : this.state.sortir === "naik" && this.state.urutkan === "nama"
                                        ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                                        : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                                    }
                                </Th>
                                <Th>EMAIL</Th>
                                <Th>TELEPON</Th>
                                <Th>STATUS</Th>
                                <Th>VERIFIKASI</Th>
                                <Th 
                                onClick={()=>this.ubahParamPengguna("dibuat")}
                                style={{cursor:"pointer"}}>
                                    DIBUAT 
                                    {this.state.urutkan !== "dibuat"
                                        ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                                        : this.state.sortir === "naik" && this.state.urutkan === "dibuat"
                                        ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                                        : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                                    }
                                </Th>
                                <Th 
                                onClick={()=>this.ubahParamPengguna("diperbarui")}
                                style={{cursor:"pointer"}}>
                                    DIPERBARUI 
                                    {this.state.urutkan !== "diperbarui"
                                        ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                                        : this.state.sortir === "naik" && this.state.urutkan === "diperbarui"
                                        ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                                        : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                                    }
                                </Th>
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
                                    dibuat={item.dibuat}
                                    diperbarui={item.diperbarui}
                                    aktif={item.aktif}
                                    terverifikasi={item.terverifikasi}
                                    ktp={item.ktp}
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