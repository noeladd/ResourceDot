/*global require describe beforeEach it */
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));

var db = require('../../../server/db');

var supertest = require('supertest-as-promised');

var userOne = {
    email: 'userOne@gmail.com',
    password: 'one'
}

var userTwo = {
    email: 'userTwo@gmail.com',
    password: 'two'
}

var resourceInfo = {
    title: 'Create a Single Page App With Go, Echo and Vue',
    author: 'Ed Zynda',
    link: 'https://scotch.io/tutorials/create-a-single-page-app-with-go-echo-and-vue',
    type: 'article'
};

var tagInfo = {
    title: 'javascript'
};


describe('User Route', function() {
    var app, User, Resource, Tag, agent, user, friend, resource, tag;

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
        User.create(userOne)
        .then(function(createdUser) {
            user = createdUser;
            done();
        })
        .catch(done);
    });

    beforeEach('Create a friend', function(done) {
        User.create(userTwo)
        .then(function(createdUser) {
            friend = createdUser;
            done();
        })
        .catch(done);
    });

    beforeEach('Create a resource', function(done){
        Resource.create(resourceInfo)
        .then(function(createdResource){
            resource = createdResource;
            resource.addTag(tag);
            done();
        })
        .catch(done)
    });

    beforeEach('Create a tag', function(done){
        Tag.create(tagInfo)
        .then(function(createdTag){
            tag = createdTag;
            done();
        })
        .catch(done);
    });

    describe('User routes', function() {
        it('adds a new user on POST, responding with 201 and created user', function() {
            return agent
            .post('/api/users')
            .send({
                email: 'anotherUser@gmail.com',
                password: 'user'
            })
            .expect(201)
            .then(function(res) {
                var createdUser = res.body;
                return User.findById(createdUser.id);
            })
            .then(function(foundUser) {
                expect(foundUser.email).to.be.equal('anotherUser@gmail.com');
            });
        });

        it('returns all users', function(done) {
            agent.get('/api/users')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
                expect(res.body[0].id).to.equal(user.id);
                done();
            });
        });

        describe('Association routes', function() {
            beforeEach('Add a friend, resource and tag', function(done) {
                user.addFriend(friend);
                user.addLike(resource);
                user.addTag(tag);
                done();
            });

            it('returns friends of a user', function(done) {
                agent
                .get('/api/users/' + user.id)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    expect(res.body.friend).to.be.an('array');
                    expect(res.body.friend[0].id).to.be.equal(friend.id);
                    done();
                });
            });

            it('returns tags of a user', function(done){
                agent
                .get('/api/users/' + user.id)
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);
                    expect(res.body.tags).to.be.an('array');
                    expect(res.body.tags[0].id).to.be.equal(tag.id);
                    done();
                })
            })

            it('returns resources of a user', function(done){
                agent
                .get('/api/users/' + user.id)
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);
                    expect(res.body.like).to.be.an('array');
                    expect(res.body.like[0].id).to.be.equal(tag.id);
                    done();
                })
            })
        });
    });
});
