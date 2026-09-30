import Genre from "../models/Genre.js";

export const getGenres = async (req, res) => {
  try {
    const response = await Genre.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const response = await Genre.findOne({
      where: { id: req.params.id }
    });
    if (!response) return res.status(404).json({ msg: "Genre tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    const { nama_genre } = req.body;
    if (!nama_genre) return res.status(400).json({ msg: "Nama genre wajib diisi" });
    
    await Genre.create({ nama_genre });
    res.status(201).json({ msg: "Genre Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { id: req.params.id } });
    if (!genre) return res.status(404).json({ msg: "Genre tidak ditemukan" });

    const { nama_genre } = req.body;
    await Genre.update({ nama_genre }, { where: { id: req.params.id } });
    res.status(200).json({ msg: "Genre Berhasil Diubah" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { id: req.params.id } });
    if (!genre) return res.status(404).json({ msg: "Genre tidak ditemukan" });

    await Genre.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Genre Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};