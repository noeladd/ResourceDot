'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag');
const User = db.model('user');

router.get('/', function(req, res, next){
    User.findAll()
    .then(function(users){
        res.json(users);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    User.findById(req.params.id, {include: [
        {model: Resource},
        {model: Tag},
        {model: User, as: 'friend'}
    ]})
    .then(function(user){
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
})
