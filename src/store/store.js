import createStore from 'unistore';
import Credentials from "../credentials.json";

// inisiasi variabel store yang akan digunakan
const initialState = {
    urlBackend: "https://api.lokesal.online",
    logoKota: "https://jambikota.go.id/new/wp-content/uploads/Logojmb_edited2.jpg",
    namaKota: "Jambi",
    tajukKota: "Tanah Pilih Pesako Betuah",
    mapboxUrl: Credentials.mapboxUrl,
    mapboxKey: Credentials.mapboxKey
};

export const store = createStore(initialState);

export const actions = store => ({
    // Mendefinisikan fungsi perubahan masukan yang terjadi
    perubahanMasukan: (state, event) => {
        store.setState({[event.target.name]: event.target.value});
    },
})