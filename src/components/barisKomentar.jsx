import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";
import swal from 'sweetalert';
import { MdDeleteSweep } from "react-icons/md";
import { Button } from "react-bootstrap";

// component stateless untuk menampilkan isi masing-masing baris keluhan
class BarisPengguna extends React.Component {
    state = {
        id: this.props.id,
        namaDepan: this.props.namaDepan,
        namaBelakang: this.props.namaBelakang,
        email: this.props.email,
        isi: this.props.isi,
        dibuat: this.props.dibuat,
        dilaporkan: this.props.dilaporkan
    }

    // update status pengguna menjadi aktif atau nonaktif
    hapusKomentar = () => {
        this.setState({memuat: true})
        const reqHapus = {
            method: 'delete',
            url: `https://api.lokesal.online/admin/keluhan/komentar/${this.state.id}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            };
        axios(reqHapus)
        .then((response) => {
            this.setState({
                'memuat': false
            })
            swal({
                title: "LOKESAL ADMIN",
                text: "Komentar berhasil dihapus",
                icon: "success"
            })
            this.props.dapatKomentar()
        })
    }

    render() {
        return (
            <Tr >
                <Td>{this.state.id}</Td>
                <Td><strong>{this.state.namaDepan+' '+this.state.namaBelakang}</strong></Td>
                <Td>{this.state.email}</Td>
                <Td>{this.state.dilaporkan+""}</Td>
                <Td>{moment(`${this.state.dibuat}Z`)
                        .tz("Asia/Jakarta")
                        .format("LL")}{", "}
                    {moment(`${this.state.dibuat}Z`).format("HH:mm")} WIB
                </Td>
                <Td>
                    <React.Fragment>
                        <button type="button" className="btn btn-link p-0" data-toggle="modal" data-target={`#modalVerifikasi${this.state.id}`}>
                                <MdDeleteSweep style={{color:"black"}}/>
                        </button>

                        <div className="modal fade" id={`modalVerifikasi${this.state.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{textAlign:"center"}}>
                            <div className="modal-dialog modal-dialog-centered modal-info" role="document">
                                <div className="modal-content text-center">
                                    <div className="modal-header d-flex justify-content-center">
                                        <h5 className="modal-title" id="exampleModalLongTitle"> Isi komentar <strong>{this.state.namaDepan+' '+this.state.namaBelakang}</strong></h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {`"`}{this.state.isi}{`"`}
                                    </div>
                                    <div className="modal-footer flex-center">
                                        <Button
                                        variant="danger"
                                        data-dismiss="modal"
                                        onClick={() => this.hapusKomentar()}
                                        >
                                        Hapus komentar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </Td>
            </Tr>
        )}
    }

export default withRouter(BarisPengguna);