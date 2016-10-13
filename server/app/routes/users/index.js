'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
const Promise = require('bluebird');
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag');
const User = db.model('user');
const Guide = db.model('guide');

function sanitize(user){
    var userObj = user.dataValues;
    delete userObj.password;
    delete userObj.salt;
    return userObj;
}

router.get('/', function(req, res, next){
    User.findAll()
    .then(function(users){
        if (users.length === 0){
            res.status(404).send();
        }
        res.json(users);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    User.findById(req.params.id, {include: [
        {model: Resource, as: 'resourceLike', include: [ Tag ]},
        {model: Resource, as: 'resourceDislike', include: [ Tag ]},
        {model: Tag},
        {model: User, as: 'friend'},
        {model: Guide},
        {model: Guide, as: 'guideLike'},
        {model: Guide, as: 'guideDislike'}
    ]})
    .then(function(user){
        if (!user){
            res.status(404).send();
        }
        res.json(sanitize(user));
    })
    .catch(next);
});

router.post('/', function(req, res, next){
    User.create(req.body)
    .then(function(createdUser) {
        res.status(201).json(createdUser);
    })
    .catch(next);
});

router.put('/:id/settags', function(req, res, next) {
  var user;
  var allTags;
  User.findById(req.params.id)
  .then(function(foundUser) {
    user = foundUser;
    return Promise.map(req.body, function(tag){
            return Tag.findOrCreate({where: {title: tag}})
        });
    })
    .then(function(tags){
        allTags = tags.map(function(tagToSpread){
            return tagToSpread[0];
        });
        return user.setTags(allTags);
    })
    .then(function(){
        res.json(allTags);
    })
    .catch(next);
});
