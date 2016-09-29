'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Article = require('./models/article');
var Book = require('./models/book');
var Podcast = require('./models/podcast');
var Tag = require('./models/tag');
var Website = require('./models/website');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.belongsToMany(User, {as: 'friend', through: 'user_friends', foreignKey: 'friendId'});
User.belongsToMany(Article, {through: 'user_article'});
User.belongsToMany(Book, {through: 'user_book'});
User.belongsToMany(Podcast, {through: 'user_podcast'});
User.belongsToMany(Tag, {as: 'current_tech', through: 'user_tag'});
User.belongsToMany(Website, {through:'user_website'});
Article.belongsToMany(User, {through: 'user_article'});
Article.belongsToMany(Tag, {through: 'article_tag'})
Book.belongsToMany(User, {through: 'user_book'});
Book.belongsToMany(Tag, {through: 'book_tag'});
Podcast.belongsToMany(User, {through: 'user_podcast'});
Podcast.belongsToMany(Tag, {through: 'podcast_tag'});
Tag.belongsToMany(Article, {through: 'article_tag'});
Tag.belongsToMany(User, {through: 'user_tag'});
Tag.belongsToMany(Book, {through: 'book_tag'});
Tag.belongsToMany(Podcast, {through: 'podcast_tag'});
Tag.belongsToMany(Website, {through: 'website_tag'});
Website.belongsToMany(User, {through: 'user_website'});
Website.belongsToMany(Tag, {through: 'website_tag'});