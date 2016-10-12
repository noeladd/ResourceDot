/*global require describe beforeEach it */
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));

var db = require('../../../server/db');

var supertest = require('supertest-as-promised');

let guideInfo = {
    title: 'Rachel\'s guide to React',
    description: 'Some great resources for learning React!', 
};

var resourceInfo = {
    title: 'Create a Single Page App With Go, Echo and Vue',
    author: 'Ed Zynda',
    link: 'https://scotch.io/tutorials/create-a-single-page-app-with-go-echo-and-vue',
    type: 'article'
};

var tagInfo = {
    title: 'javascript'
};

var userInfo = {
    email: 'userOne@gmail.com',
    password: 'one'
}

describe('Guide Route', function() {
    var app, Resource, Guide, Tag, User, agent, resource, guide, tag, user;

    beforeEach('Sync DB', function(){
        return db.sync({force: true});
    })

    beforeEach ('Create App and get DB models', function(){
        app = require('../../../server/app')(db);
        Resource = db.model('resource');
        Guide = db.model('guide');
        Tag = db.model('tag');
        User = db.model('user');
    })

    beforeEach('Create a guest agent', function(){
        agent = supertest.agent(app);
    });

    beforeEach('Create a tag', function(done){
        Tag.create(tagInfo)
        .then(function(createdTag){
            tag = createdTag;
            done();
        })
        .catch(done)
    })
    beforeEach('Create a resource', function(done){
        Resource.create(resourceInfo)
        .then(function(createdResource){
            resource = createdResource;
            done();
        })
        .catch(done);
    });
    beforeEach('Create a guide', function(done){
        Guide.create(guideInfo)
        .then(function(createdGuide){
            guide = createdGuide;
            done();
        })
        .catch(done);
    });
    beforeEach('Create a user', function(done){
        User.create(userInfo)
        .then(function(createdUser){
            user = createdUser;
            done();
        })
        .catch(done);
    });
    beforeEach('Create associations', function(){
      return Promise.all([guide.setAuthor(user), guide.addTag(tag), guide.addResource(resource)])
        

    })

    describe('Guide Routes', function(){
        it('gets back all guides', function(done){
            agent
            .get('/api/guides')
            .expect(200)
            .end(function(err, response){
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.have.length(1);
                expect(response.body[0].id).to.equal(guide.id);
                done();
            });
        })

        it('gets back a guide by Id', function(done){
            agent
            .get('/api/guides/' + guide.id)
            .expect(200)
            .end(function(err, response){
                if (err) return done(err);
                expect(response.body.title).to.equal(guide.title);
                expect(response.body.author.id).to.equal(user.id);
                expect(response.body.tags).to.be.an('array');
                expect(response.body.likeUser).to.be.an('array');
                expect(response.body.dislikeUser).to.be.an('array');
                done();
            })
        })

        it('increments likes using a put', function(done){
            agent
            .put('/api/guides/' + guide.id + '/like')
            .expect(204)
            .end(function(err){
                if (err) return done(err);
                done();
            })
        })

        it('increments dislikes using a put', function(done){
            agent
            .put('/api/guides/' + guide.id + '/dislike')
            .expect(204)
            .end(function(err){
                if (err) return done(err);
                done();
            })
        })

    })
})