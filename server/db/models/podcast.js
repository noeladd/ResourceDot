'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    host: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});