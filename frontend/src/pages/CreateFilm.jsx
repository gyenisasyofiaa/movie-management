import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createFilm } from "../services/filmService";
import { getGenres } from "../services/genreService";

export default function CreateFilm() {
  const [formData, setFormData] = useState({
    judul: "",
    sutradara: "",
    tahun_rilis: "",
    durasi: "",
    genre_id: "",
  });
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError("Gagal memuat daftar genre");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["genre_id", "tahun_rilis", "durasi"].includes(name)
        ? (value ? Number(value) : "")
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createFilm(formData);
      navigate("/films");
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal membuat film");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Tambah Film Baru</h2>
          <p className="text-sm text-slate-500 mt-1">Masukkan informasi lengkap mengenai film yang ingin ditambahkan ke katalog.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Judul Film
            </label>
            <input 
              type="text" 
              name="judul" 
              placeholder="Contoh: Interstellar"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200" 
              value={formData.judul} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Sutradara
            </label>
            <input 
              type="text" 
              name="sutradara" 
              placeholder="Contoh: Christopher Nolan"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200" 
              value={formData.sutradara} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Tahun Rilis
              </label>
              <input 
                type="number" 
                name="tahun_rilis" 
                placeholder="2014"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200" 
                value={formData.tahun_rilis} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Durasi (Menit)
              </label>
              <input 
                type="number" 
                name="durasi" 
                placeholder="169"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200" 
                value={formData.durasi} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Genre
            </label>
            <select 
              name="genre_id" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200" 
              value={formData.genre_id} 
              onChange={handleChange} 
              required
            >
              <option value="">Pilih Genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.nama_genre}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <Link 
              to="/films" 
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}