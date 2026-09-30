import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Genre from "./Genre.js";

const { DataTypes } = Sequelize;

const Film = db.define('films', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sutradara: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahun_rilis: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    durasi: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Relasi: Satu Genre memiliki banyak Film, Satu Film milik satu Genre
Genre.hasMany(Film, { foreignKey: 'genre_id' });
Film.belongsTo(Genre, { foreignKey: 'genre_id' });

export default Film;