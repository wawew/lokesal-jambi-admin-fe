import React from 'react';

const BarisKeluhan = (props) => {
  return (
    <tr>
        <td>{props.id}</td>
        <td>{props.namaDepan}{' '}{props.namaBelakang}</td>
        <td>{props.status}</td>
        <td>{props.dukungan}</td>
        <td>{props.diperbarui}</td>
    </tr>
  );
}

export default BarisKeluhan;