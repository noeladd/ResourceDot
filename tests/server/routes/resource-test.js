/*global require describe beforeEach it */
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));

const db = require('../../../server/db');

const supertest = require('supertest-as-promised');

let resourceInfo = {
    title: 'Create a Single Page App With Go, Echo and Vue',
    author: 'Ed Zynda',
    link: 'https://scotch.io/tutorials/create-a-single-page-app-with-go-echo-and-vue',
    type: 'article'
};

let tagInfo = {
    title: 'javascript'
};

describe('Resource Route', function() {
    let app, Resource, Tag, agent, resource, tag;

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
            console.log(tag);
            done();
        })
        .catch(done)
    })

    describe('Resource routes', function(){
        it('should get a response with a newly created resource', function() {
            return agent
            .post('/api/resources/')
            .send(resourceInfo)
            .expect(201)
            .then(function (response){
                resource = response.body;
                return tag.addResource(resource.id)
                .then(function(foundTag){
                 return Resource.findById(resource.id)
                })
                .then(function(foundResource){
                    console.log(foundResource);
                    expect(foundResource.title).to.be.equal('Create a Single Page App With Go, Echo and Vue');
                    });
            })
        });
    });
})
