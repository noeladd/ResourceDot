/*global require describe beforeEach it */
var expect = require('chai').expect;

var db = require('../../../server/db');

var Guide = db.model('guide')

let guideInfo = {
    title: 'Rachel\'s guide to React',
    description: 'Some great resources for learning React!'
};

let newGuide;

describe('Guide model', function(){
    beforeEach('Sync DB', function(){
        return db.sync({ force: true });
    });

    it('exists', function(){
        expect(Guide.findAll).to.be.a('function');
    });

    it('can be created', function(){
        expect(Guide.create).to.be.a('function');
    })

    describe('Instance methods', function(){

        beforeEach('create a Guide', function(done){
            Guide.create(guideInfo)
            .then(function(createdGuide){
                newGuide = createdGuide;
                done();
            })
        });

        it('has associated tag functions', function(){
            expect(newGuide.addTag).to.be.a('function');
            expect(newGuide.createTag).to.be.a('function');
        });

        it('has associated user functions', function(){
            expect(newGuide.setAuthor).to.be.a('function');
            expect(newGuide.createLikeUser).to.be.a('function');
            expect(newGuide.removeDislikeUser).to.be.a('function');
        });

        it('has associated resource functions', function(){
            expect(newGuide.addResource).to.be.a('function');
            expect(newGuide.createResource).to.be.a('function');
        })
    })
})
