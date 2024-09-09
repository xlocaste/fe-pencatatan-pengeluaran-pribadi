/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nominal, setNominal] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [daftarJenisPengeluaran, setDaftarJenisPengeluaran] = useState([]);
  const [selectedJenisPengeluaran, setSelectedJenisPengeluaran] = useState<
    number | null
  >(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/pengeluaran", {
        nominal,
        tanggal,
        catatan,
        jenis_pengeluaran_id: selectedJenisPengeluaran,
      });
      router.push("/pengeluaran");
    } catch (error) {
      console.error("Error creating buku:", error);
    }
  };

//   console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
//   console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Pengeluaran
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nominal"
              className="block text-gray-700 font-medium mb-1"
            >
              Nominal
            </label>
            <input
              id="nominal"
              type="numeric"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="Nominal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="tanggal"
              className="block text-gray-700 font-medium mb-1"
            >
              Tanggal
            </label>
            <input
              id="tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              placeholder="Tanggal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="catatan"
              className="block text-gray-700 font-medium mb-1"
            >
              Catatan
            </label>
            <input
              id="catatan"
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
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
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
