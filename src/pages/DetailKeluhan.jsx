import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";
import StatusKeluhan from "../components/keluhan";

class DetailKeluhan extends Component {
    state = {
        detailKeluhan: [],
        idKeluhan: ''
    }

    componentDidMount = () => {
        const idKeluhan = this.props.match.params.id

        // fungsi untuk menampilkan detail keluhan dengan id tertentu
        const req = {
            method: 'get',
            url: `https://api.lokesal.online/keluhan/${idKeluhan}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            };

        axios(req)
            .then((response) => {
            this.setState({ 'detailKeluhan': response.data })
            console.log('ini respons', this.state.detailKeluhan)
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
            <NavigasiAdmin 
                keluhan={true} 
                berita={false} 
                pengguna={false} 
                komentar={false} 
                kustomisasi={false} 
            />
            <StatusKeluhan 
                fotoSebelum={this.state.detailKeluhan.foto_sebelum}
                namaDepan={this.state.detailKeluhan.nama_depan}
                namaBelakang={this.state.detailKeluhan.nama_belakang}
                diperbarui={this.state.detailKeluhan.diperbarui}
                status={this.state.detailKeluhan.status}
                isi={this.state.detailKeluhan.isi}
            />
        </React.Fragment>
        );
    }
}

export default connect("", actions)(withRouter(DetailKeluhan));