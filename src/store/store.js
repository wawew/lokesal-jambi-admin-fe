import createStore from 'unistore';
// import axios from 'axios';
// import swal from 'sweetalert';

// inisiasi variabel store yang akan digunakan
const initialState = {
    urlBackend: "https://api.lokesal.online",
    logoKota: "https://jambikota.go.id/new/wp-content/uploads/Logojmb_edited2.jpg",
    namaKota: "Jambi",
    tajukKota: "Tanah Pilih Pesako Betuah",
    mapboxKey: "pk.eyJ1Ijoic3VtYXJub3dpbGx5OTQiLCJhIjoiY2s2NHo0YzlzMDMwMjNscXdzYmo3dDV4cyJ9.bOcW5ZPZob_quslf4RP0sw",
};

export const store = createStore(initialState);

export const actions = store => ({
    // Mendefinisikan fungsi perubahan masukan yang terjadi
    perubahanMasukan: (state, event) => {
        store.setState({[event.target.name]: event.target.value});
        console.log('cek input', event.target.name, event.target.value);
    },
})