import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";

class Pengguna extends Component {
  state = {
    halaman: 1,
    totalHalaman: 1,
    perHalaman: 10,
    loading: false,
    daftarPengguna: []
  }

  // fungsi untuk menampilkan seluruh data pengguna
  componentDidMount = () => {
    const req = {
      method: 'get',
      url: 'https://api.lokesal.online/admin/pengguna',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      params: {
          halaman: this.state.halaman,
          per_halaman: this.state.perHalaman
      }
    };
    console.log(req);
    axios(req)
    .then(function(response) {
        this.setState('daftarPengguna', response.data.daftar_pengguna);
        this.setState('halaman', response.data.halaman)
        this.setState('perHalaman', response.data.perHalaman)
        this.setState('totalHalaman', response.data.totaalHalaman)
        console.log("response admin pengguna", response.data);
        return response;
    })
  }

  // fungsi keluar dari akun admin
  penangananKeluar = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    this.props.history.push("/masuk")
  }

  render() {
      return (
      <React.Fragment>
          <Header penangananKeluar={this.penangananKeluar}/>
          <NavigasiAdmin keluhan={false} berita={false} pengguna={true} komentar={false} kustomisasi={false} />
      </React.Fragment>
    );
  }
}

export default connect("semuaPengguna", actions)(withRouter(Pengguna));