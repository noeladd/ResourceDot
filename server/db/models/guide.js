'use strict';
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const db = require('../_db');
const Tag = db.model('tag');
const User = db.model('user');

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
  },
  resourcePositions: {
    type: Sequelize.ARRAY(Sequelize.JSON) // eslint-disable-line
  }
}, {
    classMethods: {
      findByTags: function(tagIds) {
        return Promise.map(tagIds, function(tag){
          return Tag.findById(+tag);
        })
        .then(function(tagsInstances){
          return Promise.map(tagsInstances, function(tag){
            return tag.getGuides({include: [
              {model: User, as: 'likeUser'},
              {model: User, as: 'dislikeUser'},
              {model: Tag}
            ]});
          });
        })
        .then(function(guides){
          var allGuides = guides.reduce(function(a, b){
            return a.concat(b);
          });

          return allGuides;
        });
      }
    },
    getterMethods: {
      netLikes: function(){
        return this.likes - this.dislikes
      }
  }
});
