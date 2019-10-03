const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'post',
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
        last_name: {
            type: Sequelize.STRING,
            required: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        title: {
            type: Sequelize.STRING,
            required: true
        },
        short_description: {
            type: Sequelize.STRING,
            required: true
        },
        description: {
            type: Sequelize.STRING,
            required: true
        },
        total_ratings: {
            type: Sequelize.INTEGER,
            required: true
        },
        total_comments: {
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