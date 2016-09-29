'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag')

router.get('/', function(req, res, next) {
    Resource.findAll()
    .then(function(resources) {
        res.json(resources);
    })
    .catch(next);
});

router.get('id/:id', function(req, res, next) {
    Resource.findById(req.params.id)
    .then(function(resource) {
        res.json(resource);
    })
    .catch(next);
});

router.get('/type/:type', function(req, res, next) {
    Resource.findAll({
        where:
            {type: req.params.type},
        include: [
            {model: 'Tag'}
        ]
    })
    .then(function(resources){
        res.json(resources);
    })
    .catch(next);
})

router.post('/', function(req, res, next) {
    Resource.create(req.body)
    .then(function(createdResource) {
        res.status(201).json(createdResource);
    })
    .catch(next);
});