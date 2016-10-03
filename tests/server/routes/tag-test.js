/*global require describe beforeEach it */
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));

var db = require('../../../server/db');

var supertest = require('supertest-as-promised');

var userInfo = {
    email: 'userOne@gmail.com',
    password: 'one'
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


describe('Tag Route', function(){
    var app, User, Resource, Tag, agent, user, resource, tag

    beforeEach('Sync DB', function() {
        return db.sync({force: true});
    });

    beforeEach('Create App and get DB models', function() {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Resource = db.model('resource');
        Tag = db.model('tag');
    });

    beforeEach('Create guest agent', function() {
        agent = supertest.agent(app);
    });

    beforeEach('Create a user', function(done) {
        User.create(userInfo)
        .then(function(createdUser) {
            user = createdUser;
            done();
        })
        .catch(done);
    });

   beforeEach('Create a resource', function(done){
        Resource.create(resourceInfo)
        .then(function(createdResource){
            resource = createdResource;
            done();
        })
        .catch(done)
    });

    xbeforeEach('Create a tag', function(done){
        Tag.create(tagInfo)
        .then(function(createdTag){
            tag = createdTag
            done()
        })
    }); 

    beforeEach('associate instances', function(done){
        tag.addUser(user);
        tag.addResource(resource);
        done();
    })

    describe('Post route', function(){
        it('adds a new tag on POST, returns 201 and created tag', function(){
            return agent
            .post('/api/tags')
            .send({
                title: 'Angular'
            })
            .expect(201)
            .then(function(res) {
                var createdTag = res.body
                return Tag.findById(createdTag.id)
            })
            .then(function(foundTag) {
                expect(foundTag.title).to.equal('angular')
            });
        });

    xdescribe('Get routes', function(){
        it('gets back all tags', function(done){
            agent
            .get('/api/tags')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(1);
                expect(res.body[0].id).to.equal(tag.id);
                done();
            })
        });

        it('gets back an individual tag with associated users and resources', function(done){
            agent
            .get('/api/tags' + tag.id)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.id).to.equal(tag.id);
                expect(res.body.users[0].id).to.equal(user.id);
                expect(res.body.resources[0].id).to.equal(resource.id);
            })
        })
    })
    })
    
})