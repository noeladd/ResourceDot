'use strict';
const Sequelize = require('sequelize');
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
  resources: {
    type: Sequelize.ARRAY(Sequelize.JSON) // eslint-disable-line
  }
}, {
    classMethods: {
      findByTags: function(tagsIds) {
        return Promise.map(tagsIds, function(tag){
          return Tag.findById(+tag);
        })
        .then(function(tagsInstances){
          return Promise.map(tagsInstances, function(tag){
            return tag.getResources({include: [
              {model: User, as: 'likeUser'},
              {mode: User, as: 'dislikeUser'}
            ]});
          });
        })
        .then(function(resources){
          var allResources = resources.reduce(function(a, b){
            return a.concat(b);
          });

          return allResources;
        });
      }
    },
    getterMethods: {
      netLikes: function(){
        return this.likes - this.dislikes
      }
  }
});
