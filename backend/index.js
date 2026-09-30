import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import authRoute from "./routes/authRoute.js";
import genreRoute from "./routes/genreRoute.js";
import filmRoute from "./routes/filmRoute.js";

// Import models untuk memastikan sinkronisasi berjalan
import "./models/User.js";
import "./models/Genre.js";
import "./models/Film.js";

const app = express();
const PORT = 3000;

// 1. Middleware dasar
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// 2. Test Route
app.get("/", (req, res) => {
  res.json({ message: "API Movie Management aktif" });
});

// 3. Pasang Routes dengan prefix /api
app.use("/api/auth", authRoute);
app.use("/api", genreRoute);
app.use("/api", filmRoute);

// 4. Jalankan server dan sinkronisasi database
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Database terhubung...");
    
    // Sinkronisasi otomatis membuat tabel dari model Sequelize
    await db.sync(); 

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};

startServer();