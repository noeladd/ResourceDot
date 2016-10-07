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
  }, {
    classMethods: {
      findByTags: function(tagsId) {
        return Promise.map(tagIds, function(tag){
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
        .then(function(resource){
          var allResources = resources.reduce(function(a,b){
            return a.concat(b);
          });

          return allResources;
        });
      }
    },
    getterMethods: {
      netLikes : function(){
        return this.likes - this.dislikes
      }
  }
});
