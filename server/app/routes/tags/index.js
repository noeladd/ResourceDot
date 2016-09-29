'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag');
const User = db.model('user');

router.get('/', function(req, res, next){
    Tag.findAll()
    .then(function(tags){
        res.json(tags);
    })
    .catch(next)
});

router.get('/:id', function(req, res, next){
    Tag.findById(req.params.id, {include: [
        {model: Resource},
        {model: User}
    ]})
});

router.post('/', function(req, res, next){
    Tag.create(req.body)
    .then(function(createdTag) {
        res.status(201).json(createdTag);
    })
    .catch(next);
})
