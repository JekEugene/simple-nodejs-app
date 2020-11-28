const Sequelize = require("sequelize");
const db = require("../config/database")
const Application = require("./application");
const Certificate = require("./certificateOfAuthorship");

const User = db.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, 
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    }, {
        timestamps: false,
    }
)

User.hasMany(Application)
User.hasMany(Certificate)

Application.belongsTo(User)
Certificate.belongsTo(User)

module.exports = User;