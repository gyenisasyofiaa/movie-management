import { Sequelize } from "sequelize";
import db from"../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  }
}, {
  freezeTableName: true
});

export default User;