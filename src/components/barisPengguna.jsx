import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { GoUnverified } from "react-icons/go";
import { FaEllipsisH } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/Button';

// component stateless untuk menampilkan isi masing-masing baris keluhan
class BarisPengguna extends React.Component {
    state = {
        id: this.props.id,
        namaDepan: this.props.namaDepan,
        namaBelakang: this.props.namaBelakang,
        email: this.props.email,
        telepon: this.props.telepon,
        diperbarui: this.props.diperbarui,
        aktif: this.props.aktif,
        terverifikasi: this.props.terverifikasi,
        memuat: false,
        modalShow: false,
        setModalShow: false
    }

    // update status pengguna menjadi aktif atau nonaktif
    ubahAktif = () => {
        this.setState({memuat: true})
        const reqAktif = {
            method: 'put',
            url: `https://api.lokesal.online/admin/pengguna/${this.state.id}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            };
        axios(reqAktif)
        .then((response) => {
            this.setState({
                'memuat': false,
                aktif: response.data.aktif
            })
        })
    }
    
    render() {
        const [modalShow, setModalShow] = React.useState(false);
        return (
            <Tr >
                <Td>{this.state.id}</Td>
                <Td><strong>{this.state.namaDepan+' '+this.state.namaBelakang}</strong></Td>
                <Td>{this.state.email}</Td>
                <Td>{this.state.telepon}</Td>
                <Td>{moment(`${this.state.diperbarui}Z`)
                        .tz("Asia/Jakarta")
                        .format("LL")}{", "}
                    {moment(`${this.state.diperbarui}Z`).format("HH:mm")} WIB
                </Td>
                <Td>{
                    this.state.memuat ?
                        <span><FaEllipsisH /></span>
                    : this.state.aktif === true 
                        ? <span>
                            <FaUserCheck 
                            onClick={() => this.ubahAktif()}
                            style={{cursor:"pointer", color:"green"}}/>
                            </span> 
                        : <span><FaUserTimes 
                            onClick={() => this.ubahAktif()}
                            style={{cursor:"pointer", color:"red"}}/>
                            </span>
                    }
                </Td>
                <Td>{
                    this.state.memuat ?
                        <span><FaEllipsisH /></span>
                    : this.state.terverifikasi === true 
                        ? <span>
                            <GoVerified 
                            style={{cursor:"pointer", color:"green"}}/>
                            </span> 
                        : <ButtonToolbar>
                            <span><GoUnverified 
                                onClick={() => setModalShow(true)}
                                style={{cursor:"pointer", color:"red"}}/>
                            </span>

                            <Modal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                            </ButtonToolbar>
                    }
                </Td>
            </Tr>
        )}
    }

export default withRouter(BarisPengguna);