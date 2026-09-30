import Film from "../models/Film.js";
import Genre from "../models/Genre.js";

export const getFilms = async (req, res) => {
  try {
    const response = await Film.findAll({
      include: [{ model: Genre, attributes: ['id', 'nama_genre'] }]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const response = await Film.findOne({
      where: { id: req.params.id },
      include: [{ model: Genre, attributes: ['id', 'nama_genre'] }]
    });
    if (!response) return res.status(404).json({ msg: "Film tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createFilm = async (req, res) => {
  try {
    const { judul, sutradara, tahun_rilis, durasi, genre_id } = req.body;
    if (!judul || !sutradara || !tahun_rilis || !durasi || !genre_id) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    await Film.create({ judul, sutradara, tahun_rilis, durasi, genre_id });
    res.status(201).json({ msg: "Film Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateFilm = async (req, res) => {
  try {
    const film = await Film.findOne({ where: { id: req.params.id } });
    if (!film) return res.status(404).json({ msg: "Film tidak ditemukan" });

    const { judul, sutradara, tahun_rilis, durasi, genre_id } = req.body;
    await Film.update({ judul, sutradara, tahun_rilis, durasi, genre_id }, {
      where: { id: req.params.id }
    });
    res.status(200).json({ msg: "Film Berhasil Diubah" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const film = await Film.findOne({ where: { id: req.params.id } });
    if (!film) return res.status(404).json({ msg: "Film tidak ditemukan" });

    await Film.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Film Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};