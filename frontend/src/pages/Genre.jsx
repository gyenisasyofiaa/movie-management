import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, deleteGenre } from "../services/genreService";

export default function Genre() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memuat data genre");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus genre ini?")) {
      try {
        await deleteGenre(id);
        fetchGenres();
      } catch (err) {
        alert(err.response?.data?.msg || "Gagal menghapus genre");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header Halaman yang Bersih & Elegan */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Kategori Data</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Daftar Genre Film</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola pengelompokan genre film agar katalog lebih terstruktur.</p>
        </div>
        <Link 
          to="/genres/create" 
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-600/20 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Genre</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Kartu Tabel Profesional */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 w-20 text-center">#</th>
                <th className="py-4 px-6">Nama Genre</th>
                <th className="py-4 px-6 text-center w-48">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-slate-400">
                    Memuat data...
                  </td>
                </tr>
              ) : genres.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-12 text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl">🏷️</span>
                      <p>Belum ada data genre yang tersedia.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                genres.map((g, index) => (
                  <tr key={g.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-center font-medium text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span className="capitalize">{g.nama_genre}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link 
                          to={`/genres/edit/${g.id}`} 
                          className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 font-medium text-xs transition-colors border border-sky-100"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(g.id)} 
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-xs transition-colors border border-rose-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}