'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Resource = require('./models/resource');
var Tag = require('./models/tag');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.belongsToMany(User, {as: 'friend', through: 'user_friends', foreignKey: 'friendId'});
User.belongsToMany(User, {as: 'user', through: 'user_friends', foreignKey: 'userId'});

User.belongsToMany(Resource, {through: 'user_resource'});
Resource.belongsToMany(User, {through: 'user_resource'});

Resource.belongsToMany(Tag, {through: 'resource_tag'})
Tag.belongsToMany(Resource, {through: 'resource_tag'});

Tag.belongsToMany(User, {through: 'user_tag'});
User.belongsToMany(Tag, {through: 'user_tag'});
