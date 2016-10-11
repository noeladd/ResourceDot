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
  order: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
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
      },
      orderResources: function(guide){
        guide.resources = guide.resources.map(function(resource){
          resource.order = guide.order.indexOf(resource.id) + 1;
          return resource;
        });
        return guide;
      }
    },
    instanceMethods: {
      addOrderedResource: function(resource){
        var guide = this;
        return guide.addResource(resource.id)
        .then(function(){
          if (resource.position) {
              var index = resource.position - 1;
              guide.order.splice(index, 0, resource.id);
          }
          else guide.order.push(resource.id);
          return guide.save();
        });
      },
      removeOrderedResource: function(resource){
        var guide = this;
        return guide.removeResource(resource.id)
        .then(function(){
          var index = guide.order.indexOf(resource.id);
          guide.order.splice(index, 1);
          return guide.save();
        });
      }
    },
    getterMethods: {
      netLikes: function(){
        return this.likes - this.dislikes
      }
  }
});
