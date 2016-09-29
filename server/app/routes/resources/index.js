'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag')


//route would be /api/resources?type=article
router.get('/', function(req, res, next) {
    var reqType = req.query.type
    if(reqType){
       return Resource.findAll({
        where:
            {type: reqType},
        include: [
            {model: 'Tag'}
        ]
    })
    .then(function(resources){
        if (resources.length === 0){
            res.status(404).send();
        }
        res.json(resources);
    });
    }
    return Resource.findAll()
    .then(function(resources) {
        if (resources.length === 0){
            res.status(404).send();
        }
        res.json(resources);
    })
    .catch(next);
});



router.get('id/:id', function(req, res, next) {
    Resource.findById(req.params.id)
    .then(function(resource) {
        if (!resource){
            res.status(404).send();
        }
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
        if (resources.length === 0){
            res.status(404).send();
        }
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