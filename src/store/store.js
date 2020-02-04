import createStore from 'unistore';
// import axios from 'axios';

// inisiasi variabel store
const initialState = {
    logoKota: "https://jambikota.go.id/new/wp-content/uploads/Logojmb_edited2.jpg",
    namaKota: "Jambi",
    tajukKota: "Tanah Pilih Pesako Betuah"
};

export const store = createStore(initialState);

export const actions = (store) => ({

})