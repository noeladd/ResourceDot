'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag');
const User = db.model('user');
const Guide = db.model('guide');

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
        {model: Guide}
    ]})
    .then(function(user){
        if (!user){
            res.status(404).send();
        }
        res.json(user);
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

router.put('/:id/addtags', function(req, res, next) {
  User.findById(req.params.id)
  .then(function(user) {

    user.setTags(req.body);
  })
  .catch(next);
});
