'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Resource = db.model('resource');
const Tag = db.model('tag');
const User = db.model('user');

//route would be /api/resources?type=article, /api/resources?tag=javascript, 'api/resources?author=Jennifer+Bassett', 'api/resources?source=A+List+Apart'
router.get('/', function(req, res, next) {
  var reqTagIds = req.query.tagIds
  if (reqTagIds){
      var tags = reqTagIds.split(',');

      Resource.findByTags(tags)
      .then(function(resources){
        if (resources.length === 0){
            res.status(404).send();
        }
        res.json(resources);
        })
      .catch(next);
    } else {
    Resource.findAll({
        where: req.query,
        include: [
        {model: Tag}
        ]
    })
    .then(function(resources){
        if (resources.length === 0){
            res.status(404).send();
        }
        res.json(resources);
    })
    .catch(next);
}
});

router.get('/:id', function(req, res, next) {
    Resource.findById(req.params.id, {
        include: [
        {model: Tag},
        {model: User, as: 'likeUser'},
        {model: User, as: 'dislikeUser'}
    ]})
    .then(function(resource) {
        if (!resource){
            res.status(404).send();
        }
        res.json(resource);
    })
    .catch(next);
});

router.put('/:id/like', function(req, res, next){
    Resource.findById(req.params.id)
    .then(function(resource){
        return resource.increment('likes');
    })
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next);
});

router.put('/:id/dislike', function(req, res, next){
    Resource.findById(req.params.id)
    .then(function(resource){
        return resource.increment('dislikes');
    })
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    Resource.create(req.body)
    .then(function(createdResource) {
        res.status(201).json(createdResource);
    })
    .catch(next);
});
