import express from "express";
import {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from "../controllers/genreController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/genres', verifyToken, getGenres);
router.get('/genres/:id', verifyToken, getGenreById);
router.post('/genres', verifyToken, createGenre);
router.patch('/genres/:id', verifyToken, updateGenre);
router.delete('/genres/:id', verifyToken, deleteGenre);

export default router;