import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getFilmById, updateFilm } from "../services/filmService";
import { getGenres } from "../services/genreService";

export default function EditFilm() {
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilmData();
    fetchGenres();
  }, [id]);

  const fetchFilmData = async () => {
    try {
      const data = await getFilmById(id);
      setFormData({
        judul: data.judul,
        sutradara: data.sutradara,
        tahun_rilis: data.tahun_rilis,
        durasi: data.durasi,
        genre_id: data.genre_id,
      });
    } catch (err) {
      setError("Gagal memuat detail film");
    }
  };

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
      await updateFilm(id, formData);
      navigate("/films");
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal mengubah film");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title text-xl font-bold">Edit Film</h2>
          {error && <div className="alert alert-error py-2 text-sm">{error}</div>}
          
          <div className="form-control">
            <label className="label"><span className="label-text">Judul Film</span></label>
            <input type="text" name="judul" className="input input-bordered" value={formData.judul} onChange={handleChange} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Sutradara</span></label>
            <input type="text" name="sutradara" className="input input-bordered" value={formData.sutradara} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Tahun Rilis</span></label>
              <input type="number" name="tahun_rilis" className="input input-bordered" value={formData.tahun_rilis} onChange={handleChange} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Durasi (Menit)</span></label>
              <input type="number" name="durasi" className="input input-bordered" value={formData.durasi} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Genre</span></label>
            <select name="genre_id" className="select select-bordered" value={formData.genre_id} onChange={handleChange} required>
              <option value="">Pilih Genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.nama_genre}</option>
              ))}
            </select>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link to="/films" className="btn btn-ghost">Batal</Link>
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`}>Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}