import createStore from 'unistore';
import axios from 'axios';

// inisiasi variabel store
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

export const actions = (store) => ({
    // fungsi untuk mengarahkan formulir masuk
    penangananMasuk : () => {
        const self = this;
        const req = {
        method: 'post',
        url: 'https://api.lokesal.online/masuk',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: self.props.email,
            kata_sandi: self.props.kataSandi
        }
        };
        axios(req)
        .then(function (response) {
            if (response.data.hasOwnProperty('token')) {
            localStorage.setItem('email', self.props.username);
            localStorage.setItem('adminId', self.props.username);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('sedangMasuk', true);
            self.props.history.push('/');
            }
            console.log('response data', response.data);
        })
        .catch(function (error) {
            alert('email atau kata sandi tidak valid');
        });
    },

    // Mendefinisikan fungsi perubahan masukan yang terjadi
    perubahanMasukan: (state, event) => {
        store.setState({[event.target.name]: event.target.value});
        console.log('cek input', event.target.name, event.target.value);
    },
})