import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container } from "react-bootstrap";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";
import BarisKeluhan from "../components/barisKeluhan";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import '../styles/beranda.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class BerandaAdmin extends Component {
  // inisiasi variabel di state untuk digunakan dalam halaman beranda
  state = {
    halaman: '',
    perHalaman: '',
    totalHalaman: '',
    memuat: false,
    keluhan: [],
    keluhanHeader: [{ ID: '', Pelapor: '', Status: '', Dukungan: '', Diperbarui: '' }]
  }

  componentDidMount = () => {
    // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/masuk");
    }

    // fungsi untuk menampilkan seluruh data keluhan
    const req = {
      method: 'get',
      url: `https://api.lokesal.online/keluhan?${
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
        'totalHalaman': response.data.total_halaman,
        'keluhan': response.data.daftar_keluhan
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

  // membuat header untuk tabel keluhan
  renderTabelHeader() {
    let header = Object.keys(this.state.keluhanHeader[0])
    return header.map((key, index) => {
       return <Th key={index}>{key.toUpperCase()}</Th>
    })
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
          <Container style={{marginTop:'50px', marginBottom:'10px'}}>
            <h3 id='title'>Tabel Keluhan LOKESAL</h3>
            <Table id='keluhan'>
              <Thead>
                <Tr>
                  {this.renderTabelHeader()}
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
                    diperbarui={item.detail_keluhan.diperbarui}
                  />
                ))}
              </Tbody>
            </Table>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect("namaKota", actions)(withRouter(BerandaAdmin));