import express from "express";
import {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
} from "../controllers/filmController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/films', verifyToken, getFilms);
router.get('/films/:id', verifyToken, getFilmById);
router.post('/films', verifyToken, createFilm);
router.patch('/films/:id', verifyToken, updateFilm);
router.delete('/films/:id', verifyToken, deleteFilm);

export default router;