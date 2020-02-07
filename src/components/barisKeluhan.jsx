import React from 'react';
import { withRouter } from "react-router-dom";
import { Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

// component stateless untuk menampilkan isi masing-masing baris keluhan
const BarisKeluhan = props => {
  return (
    <Tr 
      onClick={() => props.history.push(`/keluhan/${props.id}`)} 
      style={{cursor:'pointer'}}
    >
      <Td>{props.id}</Td>
      <Td>{props.namaDepan+' '+props.namaBelakang}</Td>
      <Td>{props.status}</Td>
      <Td>{props.dukungan+""}</Td>
      <Td>{props.diperbarui}</Td>
    </Tr>
  );
}

export default withRouter(BarisKeluhan);