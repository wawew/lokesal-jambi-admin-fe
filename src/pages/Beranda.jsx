import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import NavbarAdmin from "../components/navBar";
import swal from "sweetalert";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Grafik from "../components/grafik";

class BerandaAdmin extends Component {
  // inisiasi variabel di state untuk digunakan dalam halaman beranda
  state = {
    diterima: 0,
    diproses: 0,
    selesai: 0,
    memuat: false,
    puas: 0,
    kurangPuas: 0,
    belumDiulas: 0
  }

  componentDidMount = async() => {
    // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/masuk");
    }

    this.setState({memuat: true})
    const reqStatus = {
      method: 'get',
      url: 'https://api.lokesal.online/total_keluhan',
      params: {
        kota: store.getState().namaKota,
      }
    };

    await axios(reqStatus)
    .then((response) => {
      this.setState({
          memuat: false,
          diterima: response.data.diterima,
          diproses: response.data.diproses,
          selesai: response.data.selesai
      })
    })

    this.setState({memuat: true})
    const reqPuas = {
      method: 'get',
      url: 'https://api.lokesal.online/keluhan',
      params: {
        kota: store.getState().namaKota,
        kepuasan: 'puas'
      }
    };

    await axios(reqPuas)
    .then((response) => {
      this.setState({
          memuat: false,
          puas: response.data.total_keluhan
      })
    })

    this.setState({memuat: true})
    const reqKurangPuas = {
      method: 'get',
      url: 'https://api.lokesal.online/keluhan',
      params: {
        kota: store.getState().namaKota,
        kepuasan: 'tidak_puas'
      }
    };

    await axios(reqKurangPuas)
    .then((response) => {
      this.setState({
          memuat: false,
          kurangPuas: response.data.total_keluhan
      })
    })

    this.setState({memuat: true})
    const reqBelumDiulas = {
      method: 'get',
      url: 'https://api.lokesal.online/keluhan',
      params: {
        kota: store.getState().namaKota,
        status: 'selesai',
        kepuasan: 'belum'
      }
    };

    await axios(reqBelumDiulas)
    .then((response) => {
      this.setState({
          memuat: false,
          belumDiulas: response.data.total_keluhan
      })
    })
  }

  // fungsi keluar dari akun admin
  penangananKeluar = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    swal("LOKESAL ADMIN", "Admin keluar dari aplikasi.", "success");
    this.props.history.push("/masuk")
  }
    
  render() {
      return (
      <React.Fragment>
        <NavbarAdmin 
          beranda={true}
          keluhan={false} 
          pengguna={false} 
          komentar={false}
          penangananKeluar={this.penangananKeluar} 
        />
        {this.state.memuat ?
        <div></div> :
        <Grafik 
          data={[
            { name: 'Diterima', value: this.state.diterima },
            { name: 'Diproses', value: this.state.diproses },
            { name: 'Selesai', value: this.state.selesai }
            ]}
          dataUlasan={[
            { name: 'Kurang Puas', value: this.state.kurangPuas },
            { name: 'Belum Diulas', value: this.state.belumDiulas },
            { name: 'Puas', value: this.state.puas }
            ]}
        />
        }
      </React.Fragment>
    );
  }
}

export default connect("namaKota", actions)(withRouter(BerandaAdmin));