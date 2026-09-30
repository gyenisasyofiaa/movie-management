import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key_movie_app";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: "Unauthorized: Token tidak ditemukan" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Forbidden: Token tidak valid" });
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  });
};