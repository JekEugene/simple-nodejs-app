const Sequelize = require("sequelize")

const db = new Sequelize('trisDB', 'root', 'root', {
    host: 'localhost',
    dialect:'postgres'
});

module.exports = db;