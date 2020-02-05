import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import NavigasiAdmin from "../components/navigasi";
import Header from "../components/header";

class BerandaAdmin extends Component {
    // componentDidMount = () => {
    //     if (localStorage.getItem("token") === null) {
    //       this.props.history.push("/masuk");
    //     }
    // }
    render() {
        return (
        <React.Fragment>
            <Header />
            <NavigasiAdmin />
        </React.Fragment>
    );
  }
}

export default connect("", actions)(withRouter(BerandaAdmin));