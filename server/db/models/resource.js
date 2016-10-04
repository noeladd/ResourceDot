'use strict';
const Sequelize = require('sequelize')

const db = require('../_db');

module.exports = db.define('resource', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
    },
    link: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    type: {
        type: Sequelize.ENUM('article', 'book', 'blog', 'podcast', 'website'), //eslint-disable-line new-cap
        defaultValue: 'article'
    }
});
