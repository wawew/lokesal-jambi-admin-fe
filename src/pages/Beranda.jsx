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
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import '../styles/beranda.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

class BerandaAdmin extends Component {
  // inisiasi variabel di state untuk digunakan dalam halaman beranda
  state = {
    halaman: 1,
    perHalaman: 10,
    totalHalaman: '',
    memuat: false,
    keluhan: [],
    totalKeluhan: '',
    status: '',
    kepuasan: '',
    idKeluhan: '',
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
        // status: this.state.status,
        // kepuasan: this.state.kepuasan,
        id_keluhan: this.state.idKeluhan,
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

  // fungsi mengubah param untuk kebutuhan urutkan dan sortir
  ubahParamKeluhan = (param) => {
    if(param === "diperbarui") {
      this.state.sortir === ""
      ? this.setState(
          {urutkan: "diperbarui", sortir: "naik"}, 
          () => this.dapatKeluhan()
        )
      : this.state.sortir === "turun"
        ? this.setState(
            {urutkan: "diperbarui", sortir: "naik"}, 
            () => this.dapatKeluhan()
          )
        : this.setState(
            {urutkan: "diperbarui", sortir: "turun"}, 
            () => this.dapatKeluhan()
          )
    } else if(param === "dibuat") {
      this.state.sortir === ""
      ? this.setState(
          {urutkan: "dibuat", sortir: "naik"}, 
          () => this.dapatKeluhan()
        )
      : this.state.sortir === "turun"
        ? this.setState(
            {urutkan: "dibuat", sortir: "naik"}, 
            () => this.dapatKeluhan()
          )
        : this.setState(
            {urutkan: "dibuat", sortir: "turun"}, 
            () => this.dapatKeluhan()
          )
    } else if(param === "dukungan") {
      this.state.sortir === ""
      ? this.setState(
          {urutkan: "dukungan", sortir: "naik"}, 
          () => this.dapatKeluhan()
        )
      : this.state.sortir === "turun"
        ? this.setState(
            {urutkan: "dukungan", sortir: "naik"}, 
            () => this.dapatKeluhan()
          )
        : this.setState(
            {urutkan: "dukungan", sortir: "turun"}, 
            () => this.dapatKeluhan()
          )
    }
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
                    <Th>KEPUASAN</Th>
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