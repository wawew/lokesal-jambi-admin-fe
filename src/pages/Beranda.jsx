import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";

class BerandaAdmin extends Component {
    componentDidMount = () => {
        if (localStorage.getItem("token") === null) {
          this.props.history.push("/masuk");
        }
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
            <NavigasiAdmin keluhan={true} berita={false} pengguna={false} komentar={false} kustomisasi={false} />
        </React.Fragment>
    );
  }
}

export default connect("", actions)(withRouter(BerandaAdmin));