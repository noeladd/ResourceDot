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
<<<<<<< HEAD
        if (tags.length === 0){
            res.status(404).send();
        }
=======
>>>>>>> develop
        res.json(tags);
    })
    .catch(next)
});

router.get('/:id', function(req, res, next){
    Tag.findById(req.params.id, {include: [
        {model: Resource},
        {model: User}
    ]})
<<<<<<< HEAD
    .then(function(tag){
        if(!tag){
            res.status(404).send();
        }
        res.json(tag)
    })
    .catch(next)
=======
>>>>>>> develop
});

router.post('/', function(req, res, next){
    Tag.create(req.body)
    .then(function(createdTag) {
        res.status(201).json(createdTag);
    })
    .catch(next);
})
