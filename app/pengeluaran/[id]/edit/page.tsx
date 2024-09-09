'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [nominal, setNominal] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [catatan, setCatatan] = useState('');
    const [daftarJenisPengeluaran, setDaftarJenisPengeluaran] = useState([]);
    const [selectedJenisPengeluaran, setSelectedJenisPengeluaran] = useState<
    number | null
  >(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        axios
          .get(`http://localhost:8000/api/jenis-pengeluaran`)
          .then((daftarJenisPengeluaran) =>
            setDaftarJenisPengeluaran(daftarJenisPengeluaran.data.data)
          )
          .catch((error) =>
            console.error("Error fetching pengeluaran items:", error)
          );
      }, []);

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/pengeluaran/${id}`)
                .then(response => {
                    const pengeluaran = response.data.data;
                    setNominal(pengeluaran.nominal);
                    setTanggal(pengeluaran.tanggal);
                    setCatatan(pengeluaran.catatan);
                    setDaftarJenisPengeluaran(pengeluaran.daftarJenisPengeluaran);
                })
                .catch(error => console.error('Error fetching jenis-pengeluaran:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/jenis-pengeluaran/${id}`, { nominal, tanggal, catatan, daftarJenisPengeluaran});
                router.push('/jenis-pengeluaran');
            } catch (error) {
                console.error('Error updating jenis-pengeluaran:', error);
            }
        }
    };

    console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
    console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Pengeluaran</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nominal">Nominal</label>
                            <input
                                id="nominal"
                                type="text"
                                value={nominal}
                                onChange={e => setNominal(e.target.value)}
                                placeholder="Nominal"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Tanggal</label>
                            <input
                                id="tanggal"
                                type="date"
                                value={tanggal}
                                onChange={e => setTanggal(e.target.value)}
                                placeholder="Tanggal"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Catatan</label>
                            <input
                                id="catatan"
                                type="text"
                                value={catatan}
                                onChange={e => setCatatan(e.target.value)}
                                placeholder="Catatan"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <select
                            value={selectedJenisPengeluaran || ""}
                            onChange={(e) =>
                                setSelectedJenisPengeluaran(Number(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                            <option value="">Pilih Jenis Pengeluaran</option>
                            {daftarJenisPengeluaran.length > 0 ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                daftarJenisPengeluaran.map((jenisPengeluaran: any) => {
                                //   console.log("jenisPengeluaran", jenisPengeluaran);

                                return (
                                    <option
                                    key={jenisPengeluaran.id}
                                    value={jenisPengeluaran.id}
                                    >
                                    {jenisPengeluaran.nama}
                                    </option>
                                );
                                })
                            ) : (
                                <option value="">Tidak Ada Jenis Pengeluaran</option>
                            )}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;