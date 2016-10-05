/*global require describe beforeEach it */
var expect = require('chai').expect;

var db = require('../../../server/db');

var Resource = db.model('resource')

let resourceInfo = {
    title: 'Create a Single Page App With Go, Echo and Vue',
    author: 'Ed Zynda',
    link: 'https://scotch.io/tutorials/create-a-single-page-app-with-go-echo-and-vue',
    type: 'article'
};

let newResource;

describe('Resource model', function(){
    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    it('exists', function(){
        expect(Resource.findAll).to.be.a('function');
    });

    it('can be created', function(){
        expect(Resource.create).to.be.a('function');
    })

    describe('Instance methods', function(){

        beforeEach('create a Resource', function(done){
            Resource.create(resourceInfo)
            .then(function(createdResource){
                newResource = createdResource;
                done()
            })
        });

        it('has associated tag functions', function(){
            expect(newResource.addTag).to.be.a('function');
            expect(newResource.createTag).to.be.a('function');
        });

        it('has associated user functions', function(){
            expect(newResource.addProfile).to.be.a('function');
            expect(newResource.createUser).to.be.a('function');
        })
    })
})
