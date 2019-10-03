const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        type: {
            type: Sequelize.STRING,
            required: true
        },
        image: {
            type: Sequelize.STRING,
            required: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            required: true
        },
        time: {
            type: Sequelize.INTEGER,
            required: true
        },
        number: {
            type: Sequelize.INTEGER,
            required: true
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)