'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

const db = require('../../../db');
const Guide = db.model('guide');
const Tag = db.model('tag');
const User = db.model('user');
const Resource = db.model('resource')

router.param('id', function(req, res, next, id){
    Guide.findById(id, {
        include: [
            {model: Tag},
            {model: User, as: 'author'},
            {model: User, as: 'likeUser'},
            {model: User, as: 'dislikeUser'},
            {model: Resource}
        ]
    })
    .then(function(guide) {
        if (!guide) res.status(404).send();
        req.guideById = guide;
        next();
    })
    .catch(next)
})

//query routes would be /api/guides?tagIds=1,23
router.get('/', function (req, res, next){
    var reqTagIds = req.query.tagIds
    if (reqTagIds){
        var tags = reqTagIds.split(',');
 // need to make this method on the model
        Guide.findByTags(tags)
        .then(function(guides){
            res.json(guides);
        })
        .catch(next);
    } else {
        Guide.findAll({
            include: [
                {model: Tag},
                {model: User, as: 'author'}
                ]
            })
            .then(function(guides){
                if (guides.length === 0){
                    res.status(404).send();
                }
                res.json(guides)
            })
            .catch(next)
    }
});

router.get('/:id', function(req, res, next){
    res.send(req.guideById);
})

router.put('/:id/like', function(req, res, next){
    req.guideById.increment('likes')
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next);
});

router.put('/:id/dislike', function(req, res, next){
    req.guideById.increment('dislikes')
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next);
});


router.put('/:id/add', function(req, res, next){
     req.guideById.resourcePositions.push({id: req.body.id, position: req.body.position})
     req.guideById.addResource(req.body.id)
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next);
})



router.put('/:id/delete/', function(req, res, next){
    req.guideById.removeResource(req.body.id)
    .then(function(){
        res.sendStatus(204);
    })
})

router.post('/', function(req, res, next){
    Guide.create(req.body)
    .then(function(createdResource){
        res.status(201).json(createdResource);
    })
    .catch(next);
})
