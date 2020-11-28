const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("./user")
 
const Application = db.define("application", {
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
    is_checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    check_type: {
        type: Sequelize.STRING,
    }
},{
    timestamps: false,
})

module.exports = Application;