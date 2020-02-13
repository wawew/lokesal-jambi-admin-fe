import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container, Spinner, Col } from "react-bootstrap";
import BarisKeluhan from "../components/barisKeluhan";
import Penomoran from "../components/penomoran";
import NavbarAdmin from "../components/navBar";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import swal from "sweetalert";
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import Form from 'react-bootstrap/Form';
import '../styles/keluhan.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

class Keluhan extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman beranda
    state = {
        halaman: 1,
        perHalaman: 5,
        totalHalaman: '',
        memuat: false,
        keluhan: [],
        totalKeluhan: '',
        status: '',
        kepuasan: '',
        kataKunci: '',
        urutkan: '',
        sortir: ''
    }

    // fungsi untuk menampilkan data keluhan
    dapatKeluhan = async() => {
        this.setState({memuat: true})
        const req = {
        method: 'get',
        url: 'https://api.lokesal.online/keluhan',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: {
            kota: store.getState().namaKota,
            status: this.state.status,
            kepuasan: this.state.kepuasan,
            kata_kunci: this.state.kataKunci,
            halaman: this.state.halaman,
            per_halaman: this.state.perHalaman,
            urutkan: this.state.urutkan,
            sortir: this.state.sortir
        }
    };

    await axios(req)
        .then((response) => {
        this.setState({
            memuat: false,
            halaman: response.data.halaman,
            perHalaman: response.data.per_halaman,
            totalHalaman: response.data.total_halaman,
            keluhan: response.data.daftar_keluhan,
            totalKeluhan: response.data.total_keluhan
        })
        this.props.history.push("/keluhan")
        })
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }
        this.dapatKeluhan()
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        swal("LOKESAL ADMIN", "Admin keluar dari aplikasi.", "success");
        this.props.history.push("/masuk")
    }

    // fungsi mengubah param untuk kebutuhan urutkan dan sortir
    ubahParamKeluhan = (param) => {
        if(param === "diperbarui") {
        this.state.sortir === ""
        ? this.setState(
            {halaman: 1, urutkan: "diperbarui", sortir: "naik"}, 
            () => this.dapatKeluhan()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {halaman: 1, urutkan: "diperbarui", sortir: "naik"}, 
                () => this.dapatKeluhan()
            )
            : this.setState(
                {halaman: 1, urutkan: "diperbarui", sortir: "turun"}, 
                () => this.dapatKeluhan()
            )
        } else if(param === "dibuat") {
        this.state.sortir === ""
        ? this.setState(
            {halaman: 1, urutkan: "dibuat", sortir: "naik"}, 
            () => this.dapatKeluhan()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {halaman: 1, urutkan: "dibuat", sortir: "naik"}, 
                () => this.dapatKeluhan()
            )
            : this.setState(
                {halaman: 1, urutkan: "dibuat", sortir: "turun"}, 
                () => this.dapatKeluhan()
            )
        } else if(param === "dukungan") {
        this.state.sortir === ""
        ? this.setState(
            {halaman: 1, urutkan: "dukungan", sortir: "naik"}, 
            () => this.dapatKeluhan()
            )
        : this.state.sortir === "turun"
            ? this.setState(
                {halaman: 1, urutkan: "dukungan", sortir: "naik"}, 
                () => this.dapatKeluhan()
            )
            : this.setState(
                {halaman: 1, urutkan: "dukungan", sortir: "turun"}, 
                () => this.dapatKeluhan()
            )
        }
    }

    // fungsi untuk melakukan filter tertentu
    filter = event => {
        this.setState({ 
        halaman: 1,
        [event.target.name]: event.target.value },
        () => this.dapatKeluhan());
    };

    // fungsi untuk pegaturan pagination ke halaman sebelumnya
    halamanSebelumnya = () => {
        this.setState({ halaman: this.state.halaman-1 }, 
        () => this.dapatKeluhan())
    };

    // fungsi untuk pegaturan pagination ke halaman selanjutnya
    halamanSelanjutnya = () => {
        this.setState({ halaman: this.state.halaman+1 }, 
        () => this.dapatKeluhan())
    };

    // fungsi untuk pegaturan pagination ke halaman pertama
    halamanPertama = () => {
        this.setState({ halaman: 1 }, 
        () => this.dapatKeluhan())
    };

    // fungsi untuk pegaturan pagination ke halaman terakhir
    halamanTerakhir = () => {
        this.setState({ halaman: this.state.totalHalaman }, 
        () => this.dapatKeluhan())
    };
    
    render() {
        return (
        <React.Fragment>
            <NavbarAdmin 
                beranda={false}
                keluhan={true} 
                pengguna={false} 
                komentar={false}
                penangananKeluar={this.penangananKeluar} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px'}}>
            <h3 id='title'>Tabel Keluhan Jambi</h3>
            <Form.Row style={{marginLeft:"13px", marginRight:"13px", marginTop:"20px"}}>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label 
                    style={{fontSize:"13px", marginBottom:"0px"}}>
                        ID atau Nama
                    </Form.Label>
                    <Form.Control 
                        size="sm"
                        id="kataKunci"
                        name="kataKunci"
                        placeholder="cari id atau nama"
                        onChange={event => this.filter(event)}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label style={{fontSize:"13px", marginBottom:"0px"}}>Status</Form.Label>
                    <Form.Control 
                        as="select" 
                        size="sm"
                        id="status"
                        name="status"
                        onChange={event => this.filter(event)}
                    >
                    <option value="">Semua</option>
                    <option value="diterima">Diterima</option>
                    <option value="diproses">Diproses</option>
                    <option value="selesai">Selesai</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label style={{fontSize:"13px", marginBottom:"0px"}}>Ulasan</Form.Label>
                    <Form.Control 
                        as="select" 
                        size="sm"
                        id="kepuasan"
                        name="kepuasan"
                        onChange={event => this.filter(event)}
                    >
                    <option value="">Semua</option>
                    <option value="puas">Puas</option>
                    <option value="tidak_puas">Kurang Puas</option>
                    <option value="belum">Belum Diulas</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
                {this.state.memuat ? (
                <div style={{textAlign:"center"}}>
                    <Spinner animation="grow" variant="success" />
                </div>
                ) : (
                <Table id='keluhan'>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>NAMA</Th>
                        <Th>STATUS</Th>
                        <Th
                        onClick={()=>this.ubahParamKeluhan("dukungan")}
                        style={{cursor:"pointer"}}>
                            DUKUNGAN 
                            {this.state.urutkan !== "dukungan"
                            ? <TiArrowUnsorted style={{paddingBottom:"3px"}}/>
                            : this.state.sortir === "naik" && this.state.urutkan === "dukungan"
                            ? <TiArrowSortedUp style={{paddingBottom:"3px"}}/>
                            : <TiArrowSortedDown style={{paddingBottom:"3px"}}/>
                            }
                        </Th>
                        <Th>ULASAN</Th>
                        <Th
                        onClick={()=>this.ubahParamKeluhan("dibuat")}
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
                        onClick={()=>this.ubahParamKeluhan("diperbarui")}
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
                    {this.state.keluhan.map((item) => (
                        <BarisKeluhan 
                        id={item.detail_keluhan.id} 
                        namaDepan={item.nama_depan}
                        namaBelakang={item.nama_belakang}
                        status={item.detail_keluhan.status}
                        dukungan={item.total_dukungan}
                        kepuasan={item.detail_keluhan.kepuasan}
                        dibuat={item.detail_keluhan.dibuat}
                        diperbarui={item.detail_keluhan.diperbarui}
                        />
                    ))}
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

export default connect("namaKota", actions)(withRouter(Keluhan));