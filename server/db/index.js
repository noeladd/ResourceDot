'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Resource = require('./models/resource');
var Tag = require('./models/tag');
var Guide = require('./models/guide');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.belongsToMany(User, {as: 'friend', through: 'user_friends', foreignKey: 'userId'});
User.belongsToMany(User, {as: 'user', through: 'user_friends', foreignKey: 'friendId'});

User.belongsToMany(Resource, {as: 'resourceLike', through: 'resource_like'});
Resource.belongsToMany(User, {as: 'likeUser', through: 'resource_like'});

User.belongsToMany(Resource, {as: 'resourceDislike', through: 'resource_dislike'});
Resource.belongsToMany(User, {as: 'dislikeUser', through: 'resource_dislike'});

Resource.belongsToMany(Tag, {through: 'resource_tag'})
Tag.belongsToMany(Resource, {through: 'resource_tag'});

Tag.belongsToMany(User, {through: 'user_tag'});
User.belongsToMany(Tag, {through: 'user_tag'});

User.hasMany(Guide, {foreignKey: 'authorId'});
Guide.belongsTo(User, {as: 'author'});

Resource.belongsToMany(Guide, {through: 'guide_resource'});
Guide.belongsToMany(Resource, {through: 'guide_resource'});

User.belongsToMany(Guide, {as: 'guideLike', through: 'guide_like'});
Guide.belongsToMany(User, {as: 'likeUser', through: 'guide_like'});

User.belongsToMany(Guide, {as: 'guideDislike', through: 'guide_dislike'});
Guide.belongsToMany(User, {as: 'dislikeUser', through: 'guide_dislike'});

Guide.belongsToMany(Tag, {through: 'guide_tag'})
Tag.belongsToMany(Guide, {through: 'guide_tag'});
