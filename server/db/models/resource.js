'use strict';
const Sequelize = require('sequelize');
const Promise = require('bluebird');

const db = require('../_db');
const Tag = require('./tag');
const User = require('./user')

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
  }, {
    classMethods: {
      findByTags: function(tagIds) {
        return Promise.map(tagIds, function(tag){
            return Tag.findById(+tag);
        })
        .then(function(tagsInstances){
            return Promise.map(tagsInstances, function(tag){
                return tag.getResources({include: [
                    {model: User, as: 'likeUser'},
                    {model: User, as: 'dislikeUser'}
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
