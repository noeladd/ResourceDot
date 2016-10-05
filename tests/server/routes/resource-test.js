/*global require describe beforeEach it */
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));

var db = require('../../../server/db');

var supertest = require('supertest-as-promised');

var resourceInfo = {
    title: 'Create a Single Page App With Go, Echo and Vue',
    author: 'Ed Zynda',
    link: 'https://scotch.io/tutorials/create-a-single-page-app-with-go-echo-and-vue',
    type: 'article'
};

var tagInfo = {
    title: 'javascript'
};

describe('Resource Route', function() {
    var app, Resource, Tag, agent, resource, tag;

    beforeEach('Sync DB', function() {
        return db.sync({force: true});
    })

    beforeEach('Create App get db models', function(){
        app = require('../../../server/app')(db);
        Resource = db.model('resource');
        Tag = db.model('tag');
    })

    beforeEach('Create guest agent', function() {
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
            resource.addTag(tag);
            done();
        })
        .catch(done)
    });

    describe('Resource routes', function(){
        it('adds a new resource on POST /, responding with 201 and created resource', function () {
            return agent
            .post('/api/resources/')
            .send({
                title: 'ABCD',
                link: 'EFG'
            })
            .expect(201)
            .then(function (res) {
                var createdResource = res.body;
                return Resource.findById(createdResource.id)
            })
            .then(function (foundResource) {
                expect(foundResource.title).to.be.equal('ABCD');
            });

        });

        it('gets back all resources', function(done){
            agent
            .get('/api/resources')
            .expect(200)
            .end(function(err, response){
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body[0].id).to.equal(resource.id);
                expect(response.body[0].tags[0].id).to.equal(tag.id);
                done();
            })
        })

        it('gets back resource by type', function(done){
            agent
            .get('/api/resources?type=article')
            .expect(200)
            .end(function(err, response){
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body).to.have.length(1);
                expect(response.body[0].id).to.equal(resource.id);
                done();
            })
        }),

        it('gets back resource by associated tag', function(done){
            agent
            .get('/api/resources?tagIds=1')
            .expect(200)
            .end(function(err, response){
                console.log(response.body)
                expect(response.body[0].id).to.equal(resource.id);
                done();
            })
        })

        it('gets back an empty array if no resource of that type', function(done){
            agent
            .get('/api/resources?type=podcast')
            .expect(404)
            .end(function(err){
                if (err) return done(err);
                done()
            })
        })

        it('gets back a resource and associated tag by id', function(done){
            agent
            .get('/api/resources/' + resource.id)
            .expect(200)
            .end(function(err, response){
                if (err) return done(err);
                expect(response.body.title).to.equal(resource.title);
                expect(response.body.tags).to.be.an('array');
                expect(response.body.tags[0].id).to.equal(tag.id);
                done()
            })
        })
    });
})
