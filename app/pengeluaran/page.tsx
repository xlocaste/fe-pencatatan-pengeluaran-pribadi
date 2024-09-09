'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface PengeluaranItem {
    id: number;
    nominal: string;
    tanggal: string;
    catatan: string;
    jenis_pengeluaran_id: string;
    jenisPengeluaran: {
        id:number
        nama:string
        created_at:string
        updated_at:string
    };
}

const Film = () => {

    const [pengeluaran, setPengeluaran] = useState<PengeluaranItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pengeluaran`)
            .then(response => {
                setPengeluaran(response.data.data);
            })
            .catch(error => console.error('Error fetching pengeluaran items:', error));
    }, []);

    const deletePengeluaran = (id: number) => {
        axios.delete(`http://localhost:8000/api/pengeluaran/${id}`)
            .then(() => setPengeluaran(pengeluaran.filter(pengeluaran => pengeluaran.id !== id)))
            .catch(error => console.error('Error deleting pengeluaran:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pencatatan Pengeluaran Pribadi</h1>
                    <div className="mb-6">
                        <Link href="/pengeluaran/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Pengeluaran</button>
                        </Link>
                    </div>
                    {pengeluaran.length > 0 ? (
                        <ul>
                            {pengeluaran.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nominal}</h2>
                                        <p className="text-gray-600">Jenis Pengeluaran: {item.jenisPengeluaran.nama}</p>
                                        <p className="text-gray-600">Tanggal: {item.tanggal}</p>
                                        <p className="text-gray-600">Catatan: {item.catatan}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/pengeluaran/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deletePengeluaran(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Film kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Film;