import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getGenreById, updateGenre } from "../services/genreService";

export default function EditGenre() {
  const [namaGenre, setNamaGenre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenreData();
  }, [id]);

  const fetchGenreData = async () => {
    try {
      setFetching(true);
      const data = await getGenreById(id);
      setNamaGenre(data.nama_genre);
    } catch (err) {
      setError("Gagal memuat data genre");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateGenre(id, { nama_genre: namaGenre });
      navigate("/genres");
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal memperbarui genre");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-slate-400">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Edit Genre Film</h2>
          <p className="text-sm text-slate-500 mt-1">Perbarui nama kategori genre di dalam sistem.</p>
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
              Nama Genre
            </label>
            <input
              type="text"
              placeholder="Contoh: Action, Sci-Fi"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all duration-200"
              value={namaGenre}
              onChange={(e) => setNamaGenre(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <Link 
              to="/genres" 
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
                  <span>Memperbarui...</span>
                </>
              ) : (
                <span>Simpan Perubahan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}