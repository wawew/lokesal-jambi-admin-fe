import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container, Spinner } from "react-bootstrap";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";
import BarisKeluhan from "../components/barisKeluhan";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import swal from "sweetalert";
import '../styles/beranda.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

class BerandaAdmin extends Component {
  // inisiasi variabel di state untuk digunakan dalam halaman beranda
  state = {
    halaman: 1,
    perHalaman: 10,
    totalHalaman: '',
    memuat: true,
    keluhan: [],
    urutkanDibuat: 'dibuat_turun',
    urutkanDiperbarui: 'diperbarui_turun',
    totalKeluhan: '',
    status: '',
    kepuasan: '',
    idKeluhan: ''
  }

  // fungsi untuk menampilkan data keluhan
  dapatKeluhan = () => {
    const req = {
      method: 'get',
      url: 'https://api.lokesal.online/keluhan',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: {
        kota: store.getState().namaKota,
        // status: this.state.status,
        // kepuasan: this.state.kepuasan,
        id_keluhan: this.state.idKeluhan,
        halaman: this.state.halaman,
        per_halaman: this.state.perHalaman,
        urutkan_dibuat: this.state.urutkanDibuat,
        urutkan_diperbarui: this.state.urutkanDiperbarui
      }
    };

    axios(req)
    .then((response) => {
      this.setState({
        memuat: false,
        halaman: response.data.halaman,
        perHalaman: response.data.per_halaman,
        totalHalaman: response.data.total_halaman,
        keluhan: response.data.daftar_keluhan,
        totalKeluhan: response.data.total_keluhan
      })
      this.props.history.push("/")
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

  ubahParamkeluhan = (param) => {
    if(param === "diperbarui") {
      this.state.urutkanDiperbarui === "diperbarui_naik"
      ? this.setState({urutkanDiperbarui: "diperbarui_turun"})
      : this.setState({urutkanDiperbarui: "diperbarui_naik"})
    } else if(param === "dibuat") {
      this.state.urutkanDibuat === "dibuat_naik"
      ? this.setState({urutkanDibuat: "dibuat_turun"})
      : this.setState({urutkanDibuat: "dibuat_naik"})
    }
    console.log("ini consol param keluhan oii")
    this.dapatKeluhan();
  }
    
  render() {
      return (
      <React.Fragment>
          <Header penangananKeluar={this.penangananKeluar}/>
          <NavigasiAdmin 
            keluhan={true} 
            pengguna={false} 
            komentar={false} 
          />
          <Container style={{marginTop:'50px', marginBottom:'10px', textAlign:"center"}}>
            <h3 id='title'>Tabel Keluhan Jambi</h3>
            {this.state.memuat ? (
              <Spinner animation="grow" variant="success" />
            ) : (
              <Table id='keluhan'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NAMA</Th>
                    <Th>STATUS</Th>
                    <Th>DUKUNGAN</Th>
                    <Th>KEPUASAN</Th>
                    <Th>
                      <span onclick={()=>this.ubahParamkeluhan("dibuat")}>
                        DIBUAT
                      </span>
                    </Th>
                    <Th onclick={()=>this.ubahParamkeluhan("diperbarui")}>DIPERBARUI</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.keluhan.map((item) => (
                    <BarisKeluhan 
                      id={item.detail_keluhan.id} 
                      namaDepan={item.nama_depan}
                      namaBelakang={item.nama_belakang}
                      status={item.detail_keluhan.status}
                      dukungan={item.detail_keluhan.total_dukungan}
                      kepuasan={item.detail_keluhan.kepuasan}
                      dibuat={item.detail_keluhan.dibuat}
                      diperbarui={item.detail_keluhan.diperbarui}
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

export default connect("namaKota", actions)(withRouter(BerandaAdmin));