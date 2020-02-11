import React from 'react';
import axios from 'axios';
import { Container, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";
import { FaUserCheck, FaUserTimes, FaEllipsisH, FaIdCard } from "react-icons/fa";
import { GoVerified, GoUnverified } from "react-icons/go";
import swal from 'sweetalert';

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
        memuatVerif: false,
        ktp: this.props.ktp
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
            swal({
                title: "LOKESAL ADMIN",
                text: "Perubahan status berhasil.",
                icon: "success"
            })
        })
    }

    // update status pengguna menjadi aktif atau nonaktif
    ubahVerifikasi = () => {
        this.setState({memuat: true})
        const reqAktif = {
            method: 'post',
            url: `https://api.lokesal.online/admin/pengguna/${this.state.id}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            };
        axios(reqAktif)
        .then((response) => {
            this.setState({
                'memuat': false,
                terverifikasi: response.data.terverifikasi
            })
        swal({
            title: "LOKESAL ADMIN",
            text: "Verifikasi KTP berhasil.",
            icon: "success"
        })
        this.props.history.push("/pengguna")
        })
    }

    render() {
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
                    this.state.memuatVerif ?
                        <span><FaEllipsisH /></span>
                    : this.state.terverifikasi === true 
                        ? <span>
                            <GoVerified 
                            style={{cursor:"pointer", color:"green"}}/>
                            </span> 
                        : <React.Fragment>
                            <button type="button" className="btn btn-link p-0" data-toggle="modal" data-target={`#modalVerifikasi${this.state.id}`}>
                                    <GoUnverified 
                                    style={{color:"red"}}/>
                            </button>

                            <div className="modal fade" id={`modalVerifikasi${this.state.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{textAlign:"center"}}>
                                <div className="modal-dialog modal-dialog-centered modal-info" role="document">
                                    <div className="modal-content text-center">
                                        <div className="modal-header d-flex justify-content-center">
                                            <h5 className="modal-title" id="exampleModalLongTitle"> Verifikasi KTP Pengguna</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            { this.state.ktp === ""
                                            ? <Container>
                                                <FaIdCard 
                                                style={{
                                                    width:"200px", 
                                                    height:"200px", 
                                                    color: "gray"
                                                    }}
                                                />
                                                </Container>
                                            : <Container>
                                                <Image alt="foto sesudah" 
                                                    src={this.state.ktp} 
                                                    style={{width:"100%", height:"100%", objectFit:"cover"}}rounded/>
                                                </Container>
                                            }
                                        </div>
                                        <div className="modal-footer flex-center">
                                            <Button
                                            variant="success"
                                            data-dismiss="modal"
                                            onClick={() => this.ubahVerifikasi()}
                                            disabled={this.state.ktp === "" ? true : false}>
                                            Verifikasi Pengguna
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </Td>
            </Tr>
        )}
    }

export default withRouter(BarisPengguna);