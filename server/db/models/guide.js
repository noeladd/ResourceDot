'use strict';
const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('guide', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
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
