import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import NavbarAdmin from "../components/navBar";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import { Spinner, Container, Col } from "react-bootstrap";
import swal from "sweetalert";
import BarisKomentar from "../components/barisKomentar";
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import Form from 'react-bootstrap/Form';
import '../styles/komentar.css';
import Penomoran from "../components/penomoran";

class Komentar extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman komentar
    state = {
        halaman: 1,
        perHalaman: 10,
        totalHalaman: '',
        memuat: false,
        totalKomentar: '',
        idKomentar: '',
        urutkan: '',
        sortir: '',
        komentar: []
    }

    // fungsi menampilkan baris komentar
    mapKomentar = () => {
        return (
            this.state.komentar.map((item) => (
                <BarisKomentar 
                    dapatKomentar={this.dapatKomentar}
                    id={item.detail_komentar.id} 
                    namaDepan={item.nama_depan}
                    namaBelakang={item.nama_belakang}
                    email={item.email}
                    isi={item.detail_komentar.isi}
                    dibuat={item.detail_komentar.dibuat}
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
            url: 'https://api.lokesal.online/admin/keluhan/komentar',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            params: {
                kota: store.getState().namaKota,
                id_komentar: this.state.idKomentar,
                urutkan: this.state.urutkan,
                sortir: this.state.sortir,
                halaman: this.state.halaman,
                per_halaman: this.state.perHalaman
            }
        };
    
        await axios(req)
            .then((response) => {
            this.setState({
                memuat: false,
                halaman: response.data.halaman,
                perHalaman: response.data.per_halaman,
                totalHalaman: response.data.total_halaman,
                totalKomentar: response.data.total_komentar,
                komentar: response.data.daftar_komentar
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
     
    // fungsi mengubah param untuk kebutuhan urutkan dan sortir
    ubahParamKomentar = (param) => {
        if(param === "laporan") {
        this.state.sortir === ""
        ? this.setState(
            {halaman: 1, urutkan: "laporan", sortir: "naik"}, 
            () => this.dapatKomentar()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {halaman: 1, urutkan: "laporan", sortir: "naik"}, 
                () => this.dapatKomentar()
            )
            : this.setState(
                {halaman: 1, urutkan: "laporan", sortir: "turun"}, 
                () => this.dapatKomentar()
            )
        } else if(param === "dibuat") {
        this.state.sortir === ""
        ? this.setState(
            {halaman: 1, urutkan: "dibuat", sortir: "naik"}, 
            () => this.dapatKomentar()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {halaman: 1, urutkan: "dibuat", sortir: "naik"}, 
                () => this.dapatKomentar()
            )
            : this.setState(
                {halaman: 1, urutkan: "dibuat", sortir: "turun"}, 
                () => this.dapatKomentar()
            )
        }
    }

    // fungsi untuk melakukan filter tertentu
    filter = event => {
        this.setState({ 
            halaman: 1,
            [event.target.name]: event.target.value },
            () => this.dapatKomentar());
    };

    // fungsi untuk pegaturan pagination ke halaman sebelumnya
    halamanSebelumnya = () => {
        this.setState({ halaman: this.state.halaman-1 }, 
        () => this.dapatKomentar())
    };

    // fungsi untuk pegaturan pagination ke halaman selanjutnya
    halamanSelanjutnya = () => {
        this.setState({ halaman: this.state.halaman+1 }, 
        () => this.dapatKomentar())
    };

    // fungsi untuk pegaturan pagination ke halaman pertama
    halamanPertama = () => {
        this.setState({ halaman: 1 }, 
        () => this.dapatKomentar())
    };

    // fungsi untuk pegaturan pagination ke halaman terakhir
    halamanTerakhir = () => {
        this.setState({ halaman: this.state.totalHalaman }, 
        () => this.dapatKomentar())
    };

    render() {
        return (
        <React.Fragment>
            <NavbarAdmin 
                beranda={false}
                keluhan={false} 
                pengguna={false} 
                komentar={true}
                penangananKeluar={this.penangananKeluar} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px'}}>
                <h3 id='title'>Tabel Komentar {store.getState().namaKota}</h3>
                <Form.Row style={{marginLeft:"13px", marginRight:"13px", marginTop:"20px"}}>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Control 
                            size="sm"
                            id="idKomentar"
                            name="idKomentar"
                            placeholder="Cari ID"
                            style={{width:"70px", textAlign:"center"}}
                            onChange={event => this.filter(event)}
                        />
                    </Form.Group>
                </Form.Row>
                {this.state.memuat ? (
                    <div style={{textAlign:"center"}}>
                        <Spinner animation="grow" variant="success" />
                    </div>
                ) : (
                    <Table id='komentar'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>NAMA</Th>
                                <Th>EMAIL</Th>
                                <Th 
                                onClick={()=>this.ubahParamKomentar("laporan")}
                                style={{cursor:"pointer"}}>
                                    LAPORAN 
                                    {this.state.urutkan !== "laporan"
                                        ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                                        : this.state.sortir === "naik" && this.state.urutkan === "laporan"
                                        ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                                        : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                                    }
                                </Th>
                                <Th 
                                onClick={()=>this.ubahParamKomentar("dibuat")}
                                style={{cursor:"pointer"}}>
                                    DIBUAT 
                                    {this.state.urutkan !== "dibuat"
                                        ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                                        : this.state.sortir === "naik" && this.state.urutkan === "dibuat"
                                        ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                                        : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                                    }
                                </Th>
                                <Th>HAPUS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.mapKomentar()}
                        </Tbody>
                    </Table>
                )}
            </Container>
            <Penomoran 
                sebelumnya={this.halamanSebelumnya}
                selanjutnya={this.halamanSelanjutnya}
                pertama={this.halamanPertama}
                terakhir={this.halamanTerakhir}
                halaman={this.state.halaman}
                totalHalaman={this.state.totalHalaman}
            />
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Komentar));