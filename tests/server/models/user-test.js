/*global require describe beforeEach it afterEach */
var sinon = require('sinon');
var expect = require('chai').expect;


var db = require('../../../server/db');

var User = db.model('user');

var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

let newUser;


describe('User model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    it('exists', function(){
        expect(User.findAll).to.be.a('function');
    });

    it('can be created', function(){

        expect(User.create).to.be.a('function');

    })
    describe('Instance methods', function(){

        beforeEach('create a User', function(done){
            User.create(userInfo)
            .then(function(createdUser){
                newUser = createdUser;
                done()
            })
        });

        it('has associated tag functions', function(){


            expect(newUser.addTag).to.be.a('function');
            expect(newUser.createTag).to.be.a('function');
        });

        it('has associated user functions', function(){
           expect(newUser.addFriend).to.be.a('function');
           expect(newUser.createFriend).to.be.a('function');
        });

        it('has associated resource functions', function(){
            expect(newUser.addResourceLike).to.be.a('function');
            expect(newUser.createResourceLike).to.be.a('function');
            expect(newUser.addResourceDislike).to.be.a('function');
        })


    })

    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok; //eslint-disable-line
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {}; //eslint-disable-line id-length
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf'); //eslint-disable-line id-length

                expect(hashDigestStub.calledWith('hex')).to.be.ok; //eslint-disable-line
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });

            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok; //eslint-disable-line
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
            });

            it('should set user.password to the encrypted password', function (done) {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

        describe('sanitize method', function () {

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            it('should remove sensitive information from a user object', function () {
                createUser().then(function (user) {
                    var sanitizedUser = user.sanitize();
                    expect(user.password).to.be.ok; //eslint-disable-line
                    expect(user.salt).to.be.ok; //eslint-disable-line
                    expect(sanitizedUser.password).to.be.undefined; //eslint-disable-line
                    expect(sanitizedUser.salt).to.be.undefined; //eslint-disable-line
                });
            });
        });

    });

});
