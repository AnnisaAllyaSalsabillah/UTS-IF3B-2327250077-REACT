import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function List() {
  const [social_Users, setSocial_Users] = useState([]);

  useEffect(() => {
    axios
      .get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
      .then((response) => {
        setSocial_Users(response.data.result);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this! Social User: ${nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
          .then((response) => {
            setSocial_Users(fakultas.filter((data) => data.id != id));
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            Swal.fire('Error', 'There was an issue deleting the data.', 'error');
          });
      }
    });
  };
  return (
    <>
      <h2>List Pengguna Sosial Media</h2>

      {/*Tombol Tambah Pengguna */}
      <NavLink to="/social_users/create" className="btn btn-primary mb-4">
        Create
      </NavLink>
      <ul className="list-group">
        {fakultas.map((data) => (
          <li key={data.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{data.nama}</span> {/*Menampilkan nama Pengguna*/}
            <div className="btn-group" role="group" aria-label="Action buttons">
              <NavLink to={`/social_users/edit/${data.id}`} className="btn btn-warning">
                Edit
              </NavLink>
              <button onClick={() => handleDelete(data.id, data.nama)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
