/*global require describe beforeEach it afterEach */
var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Tag = db.model('tag');

var tagInfo = {
    title: 'angular'
};

let newTag;

describe('Tag model', function() {

    beforeEach('Sync DB', function() {
        return db.sync({force: true});
    });

    it('exists', function() {
        expect(Tag.findAll).to.be.a('function');
    });

    it('can be created', function() {
        expect(Tag.create).to.be.a('function');
    })

    describe('Instance methods', function() {

        beforeEach('create a tag', function(done) {
            Tag.create(tagInfo)
            .then(function(createdTag) {
                newTag = createdTag;
                done();
            });
        });

        it('has associated user functions', function() {
            expect(newTag.addUser).to.be.a('function');
            expect(newTag.createUser).to.be.a('function');
        });

        it('has associated resource functions', function() {
            expect(newTag.addResource).to.be.a('function');
            expect(newTag.createResource).to.be.a('function');
        });
    });
});

