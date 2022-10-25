// IMPORTS
const Sequelize = require("sequelize");
require("dotenv").config();

// CONNECTION JAWSDB
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_N, process.env.DB_U, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
