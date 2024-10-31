import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateFakultas() {
  //Inisialisasi state u/ menyimpan nama fakultas
  const [namaSocialUsers, setNamaSocialUsers] = useState('');
  //inisialisasi state u/ menyimpan pesan error
  const [error, setError] = useState('');
  //inisialiasi state u/ menyimpan pesan sukses
  const [success, setSucces] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucces('');

    if (namaSocialUsers.trim() === '') {
      setError('Nama Pengguna is required'); //set pesan error jika field kosong
      return; //Stop eksekusi
    }

    try {
      const response = await axios.post('https://project-apiif-3-b.vercel.app/api/api/fakultas', {
        nama: namaSocialUsers, //Data yang dikirim berupa objek JSON
      });

      if (response.status === 201) {
        //Tampilkan pesan sukses jika fakultas berhasil dibuat
        setSucces('Social Users created succesfully');
        setNamaSocialUsers('');
      } else {
        //Jika tidak berhasil, maka pesan error tampil
        setError('Failed to create Social Users');
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
      setError('An error occured while creating fakultas');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Social User</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form untuk mengisi nama Pengguna */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaFakultas" className="form-label">
            Nama Pengguna Sosial Media
          </label>

          {/* Input untuk nama Pengguna dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="namaFakultas"
            value={namaSocialUsers} // Nilai input disimpan di state namaSocialUsers
            onChange={(e) => setNamaSocialUsers(e.target.value)} // Update state saat input berubah
            placeholder="Masukkan Nama Pengguna" // Placeholder teks untuk input
          />
        </div>
        {/* Type Button Submit */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
