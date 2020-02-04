import createStore from 'unistore';
import axios from 'axios';
import swal from 'sweetalert';

// inisiasi variabel store yang akan digunakan
const initialState = {
    logoKota: "https://jambikota.go.id/new/wp-content/uploads/Logojmb_edited2.jpg",
    namaKota: "Jambi",
    tajukKota: "Tanah Pilih Pesako Betuah",
    email: "",
    adminId: "",
    kataSandi: "",
    sedangMasuk: ""
};

export const store = createStore(initialState);

export const actions = store => ({
    // fungsi untuk mengarahkan formulir masuk
    penangananMasuk: state => {
        const req = {
        method: 'post',
        url: 'https://api.lokesal.online/admin/masuk',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: state.email,
            kata_sandi: state.kataSandi
        }
        };
        axios(req)
        .then(function (response) {
            if (response.data.hasOwnProperty('token')) {
            localStorage.setItem('email', state.email);
            localStorage.setItem('adminId', state.adminId);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('sedangMasuk', true);
            this.props.history.push('/');
            }
            console.log('response data', response.data);
        })
        .catch(function (error) {
            swal("Admin gagal masuk!", "Email atau kata sandi anda tidak valid", "error");
        });
    },

    // Mendefinisikan fungsi perubahan masukan yang terjadi
    perubahanMasukan: (state, event) => {
        store.setState({[event.target.name]: event.target.value});
        console.log('cek input', event.target.name, event.target.value);
    },
})