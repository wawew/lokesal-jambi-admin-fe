import React, { Component } from "react";
import { storage } from "../config/firebase";
import { Spinner, Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from 'axios';
import NavbarAdmin from "../components/navBar";
import StatusKeluhan from "../components/statusKeluhan";
import Peta from "../components/peta";
import swal from "sweetalert";
import { FaFileImage } from "react-icons/fa";
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";
import '../styles/detailKeluhan.css';

class DetailKeluhan extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman detail keluhan
    state = {
        detailKeluhan: [],
        idKeluhan: "",
        longitude: 0,
        latitude: 0,
        memuat: false,
        urlFotoSesudah: "",
        foto: null,
        namaFoto: "",
        isiTanggapan: "",
        linkFoto: ""
    }

    ubahFoto = event => {
        this.setState({ urlFotoSesudah: "" });
        const fileFoto = event.target.files[0];
        if (fileFoto) {
            if (
                fileFoto.name.lastIndexOf(".") > 0 &&
                (fileFoto.name
                    .substring(fileFoto.name.lastIndexOf(".") + 1, fileFoto.name.length)
                    .toLowerCase() === "jpg" ||
                fileFoto.name
                    .substring(fileFoto.name.lastIndexOf(".") + 1, fileFoto.name.length)
                    .toLowerCase() === "jpeg" ||
                fileFoto.name
                    .substring(fileFoto.name.lastIndexOf(".") + 1, fileFoto.name.length)
                    .toLowerCase() === "png")
            ) {
                this.setState({
                    foto: fileFoto,
                    urlFotoSesudah: URL.createObjectURL(fileFoto),
                    namaFoto: URL.createObjectURL(fileFoto)
                });
            } else {
                this.setState({
                    foto: fileFoto,
                    namaFoto: URL.createObjectURL(fileFoto)
                });
            }
        }
    };

    kirimTanggapan = () => {
        const idKeluhan = this.props.match.params.id
        this.setState({ memuat: true });
        if (this.state.isiTanggapan === "") {
            this.setState({ memuat: false });
            swal(
                "Kirim tanggapan gagal!",
                "Harap mengisi isi tanggapan terlebih dahulu!",
                "error"
            );
            } else {
            if (this.state.foto !== null) {
                const fileFoto = this.state.foto.name;
                if (
                fileFoto.lastIndexOf(".") > 0 &&
                (fileFoto
                    .substring(fileFoto.lastIndexOf(".") + 1, fileFoto.length)
                    .toLowerCase() === "jpg" ||
                    fileFoto
                    .substring(fileFoto.lastIndexOf(".") + 1, fileFoto.length)
                    .toLowerCase() === "jpeg" ||
                    fileFoto
                    .substring(fileFoto.lastIndexOf(".") + 1, fileFoto.length)
                    .toLowerCase() === "png")
                ) {
                const link = `${moment().format()}_${this.state.foto.name}`;
                const uploadTask = storage
                    .ref("tanggapan")
                    .child(link)
                    .put(this.state.foto);
                uploadTask.on(
                    "state_changed",
                    () => console.log("..."),
                    () => this.setState({ memuat: false }),
                    () => {
                    storage
                        .ref("tanggapan")
                        .child(link)
                        .getDownloadURL()
                        .then(url => {
                        this.setState({ linkFoto: url });
                        const request = {
                            method: "put",
                            url: `https://api.lokesal.online/admin/keluhan/${idKeluhan}`,
                            headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                            },
                            data: {
                                foto_sesudah: this.state.linkFoto,
                                isi: this.state.isiTanggapan
                            }
                        };
                        axios(request)
                            .then(response => {
                                this.setState({
                                    isiTanggapan: "",
                                    foto: null,
                                    urlFotoSesudah: "",
                                    linkFoto: "",
                                    namaFoto: "",
                                    memuat: false
                                });
                                this.props.history.push(`/`);
                            })
                            .catch(() => {
                                this.setState({ memuat: false });
                                swal(
                                    "Kirim tanggapan gagal!",
                                    "Silahkan coba lagi",
                                    "error"
                                );
                            });
                        });
                    }
                );
                } else {
                this.setState({ memuat: false });
                swal(
                    "Kirim tanggapan gagal!",
                    "Ekstensi file foto harus jpg, jpeg, atau png",
                    "error"
                );
                }
            } else {
                const request = {
                method: "put",
                url: `https://api.lokesal.online/admin/keluhan/${idKeluhan}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                data: {
                    foto_sesudah: this.state.linkFoto,
                    isi: this.state.isiTanggapan
                }
                };
                axios(request)
                .then(response => {
                    this.setState({
                        isiTanggapan: "",
                        foto: null,
                        urlFotoSesudah: "",
                        linkFoto: "",
                        namaFoto: "",
                        memuat: false
                    });
                    this.props.history.push(`/`);
                })
                .catch(() => {
                    this.setState({ memuat: false });
                    swal("Kirim tanggapan gagal!", "Silahkan coba lagi", "error");
                });
            }
        }
    };

    componentDidMount = async() => {
        this.setState({ memuat: true })
        const idKeluhan = this.props.match.params.id

        // fungsi untuk menampilkan detail keluhan dengan id tertentu
        const req = {
            method: 'get',
            url: `https://api.lokesal.online/keluhan/${idKeluhan}`,
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            };

        await axios(req)
            .then((response) => {
            this.setState({ 
                detailKeluhan: response.data,
                longitude: response.data.longitude, 
                latitude: response.data.latitude,
                memuat: false })
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
                beranda={false}
                keluhan={true} 
                pengguna={false} 
                komentar={false}
                penangananKeluar={this.penangananKeluar} 
            />

            {this.state.detailKeluhan.status === "diterima" ? (
            <Container>
                <Row>
                    <Col xs={12} md={12} style={{textAlign:'center', marginTop:"50px"}}>
                        <h6 style={{textAlign:"center"}}>Foto Sebelum</h6>
                        {this.state.detailKeluhan.foto_sebelum === ""
                        ? <div className="tanggapan-foto-kosong" style={{width:"50%"}}>
                            <FaFileImage style={{
                                marginTop:"125px"
                                }}/>
                            </div>
                        : <Image style={{ 
                            width: "50%", 
                            height: "300px",  
                            objectFit:'cover'
                        }} 
                        src={this.state.detailKeluhan.foto_sebelum} 
                        alt="foto sebelum"
                        fluid rounded
                        />}
                    </Col>
                </Row>
            </Container> 
            ) : this.state.detailKeluhan.status === "diproses" ? (
                <Container>
                    <Row>
                        <Col xs={12} md={6} style={{textAlign:'center', marginTop:"50px"}}>
                            <h6 style={{textAlign:"center"}}>Foto Sebelum</h6>
                            <Image style={{ 
                                width: "100%", 
                                height: "300px",  
                                objectFit:'cover'
                            }} 
                            src={this.state.detailKeluhan.foto_sebelum} 
                            alt="foto sebelum"
                            fluid rounded
                            />
                        </Col>
                        <Col xs={12} md={6} style={{textAlign:'center', marginTop:"50px"}}>
                            <Container fluid className="tanggapan-foto">
                                <Row>
                                    <Col>
                                    <h6 style={{textAlign:"center"}}>Foto Sesudah</h6>
                                    {this.state.urlFotoSesudah === "" ? (
                                        <div className="tanggapan-foto-kosong">
                                            <FaFileImage style={{marginTop:"125px"}}/>
                                        </div>
                                    ) : (
                                        <Image alt="foto sesudah" src={this.state.urlFotoSesudah} />
                                    )}
                                    </Col>
                                </Row>
                                <Row className="tanggapan-foto-row">
                                    <Col></Col>
                                    <Col className="tanggapan-unggah" xs="auto">
                                        <input
                                            type="file"
                                            id="tanggapan-unggah-foto"
                                            className="tanggapan-unggah-foto"
                                            onChange={this.ubahFoto}
                                        />
                                        <Button
                                            variant="secondary"
                                            className="tanggapan-unggah-foto-button"
                                            onClick={() =>
                                            document.getElementById("tanggapan-unggah-foto").click()
                                            }
                                        >
                                            Unggah Foto
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container> 
            ) : (
                <Container>
                    <Row>
                        <Col xs={12} md={6} style={{textAlign:'center', marginTop:"50px"}}>
                            <h6 style={{textAlign:"center"}}>Foto Sebelum</h6>
                            <Image style={{ 
                            width: "100%", 
                            height: "300px",  
                            objectFit:'cover'
                            }} 
                            src={this.state.detailKeluhan.foto_sebelum} 
                            alt="foto sebelum"
                            fluid rounded
                            />
                        </Col>
                        <Col xs={12} md={6} style={{textAlign:'center', marginTop:"50px"}}>
                            <Container fluid className="tanggapan-foto">
                                <Row>
                                    <Col>
                                    <h6 style={{textAlign:"center"}}>Foto Sesudah</h6>
                                        <div className="tanggapan-foto-kosong">
                                            <Image alt="foto sesudah" src={this.state.detailKeluhan.foto_sesudah} />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container> 
            )}

            <StatusKeluhan 
                namaDepan={this.state.detailKeluhan.nama_depan}
                namaBelakang={this.state.detailKeluhan.nama_belakang}
                diperbarui={this.state.detailKeluhan.diperbarui}
                status={this.state.detailKeluhan.status}
                isi={this.state.detailKeluhan.isi}
            />

            <Container style={{marginTop:"30px", marginBottom:"30px"}}>
                {this.state.memuat ?
                <div>
                    
                </div>:
                <Peta longitude={this.state.longitude} latitude={this.state.latitude} />
            }
            </Container>

            {this.state.detailKeluhan.status === "selesai" ? (
                <Container className="tanggapan-textarea" style={{marginTop: '30px', marginBottom:"30px"}}>
                    <Row>
                        <Col>
                            <h6><strong>Tanggapan Admin</strong></h6>
                            <span>{this.state.detailKeluhan.tanggapan_admin[1].isi}</span>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="tanggapan-textarea" style={{marginTop: '30px', marginBottom:"30px"}}>
                    <Row>
                        <Col>
                        <Form onSubmit={event => event.preventDefault()}>
                            <Form.Group>
                            <Form.Label><strong>Masukkan tanggapan admin:</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                value={this.state.isiTanggapan}
                                onChange={event => {
                                this.setState({ isiTanggapan: event.target.value });
                                }}
                            />
                            </Form.Group>
                            {this.state.memuat ? (
                                <div style={{textAlign:"center"}}>
                                    <Spinner animation="grow" variant="success" />
                                </div>
                            ) : (
                            <Button
                                variant= {this.state.detailKeluhan.status === "diterima" ? "warning" : "success"}
                                type="submit"
                                onClick={() => this.kirimTanggapan()}
                            >
                                Kirim Tanggapan
                            </Button>
                            )}
                        </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </React.Fragment>
        );
    }
}

export default DetailKeluhan;