import React from 'react';
import logo from '../images/LOKESALtransparent.png';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../store/store';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css';

const FormulirMasuk = props => {
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
            <div className="fadeIn first">
                <img style={{ marginTop: '30px', marginBottom: '30px' }} src={logo} id="icon" alt="User Icon" />
            </div>
            {/* <!-- Formulir Masuk --> */}
                <form onSubmit={e => e.preventDefault()}>
                    <input
                    type="text"
                    id="email"
                    className="fadeIn second"
                    name="email"
                    placeholder="email@domain.com"
                    onChange={e => props.perubahanMasukan(e)}
                    />
                    <input
                    type="password"
                    id="kataSandi"
                    className="fadeIn third"
                    name="kataSandi"
                    placeholder="*************"
                    onChange={e => props.perubahanMasukan(e)}
                    />
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={props.penangananMasuk} />
                </form>
            </div>
        </div>
    );
}

export default connect('email, adminId, kataSandi, sedangMasuk', actions)(withRouter(FormulirMasuk));