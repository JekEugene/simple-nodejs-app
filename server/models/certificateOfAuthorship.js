const Sequelize = require("sequelize");
const db = require("../config/database")
const User = require("./user")

const Certificate = db.define("certificate_of_authorship", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    patent_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    patent_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{
    timestamps: false,
})

module.exports = Certificate;