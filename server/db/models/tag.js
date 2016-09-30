'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('tag', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})
