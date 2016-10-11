'use strict';
/* globals module inject chai */
var expect = chai.expect;

function randomNum (upperBound) {
	return Math.floor(Math.random() * upperBound);
}

// generate fake resources
function makeFakeResource () {
	return {
		id: 'xyz' + randomNum(1000),
		title: 'Thing' + randomNum(1000)
	};
}

describe('Resource Factory', function() {
	/*------------------
		CONFIGURATION
	/------------------*/

	//load our Angular app from scratch
	beforeEach(module('FullstackGeneratedApp'));

	// need to load Resource Factory before each test?
	var ResourceFactory, $httpBackend;
	beforeEach(inject(function($injector) {
		ResourceFactory = $injector.get('ResourceFactory');
		$httpBackend = $injector.get('$httpBackend');
	}));

	// checks that $httpBackend received and handled all expected calls
	afterEach(function() {
		try {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		} catch (err) {
			this.test.error(err);
		}
	});

	/*------------------
		TEST SPECS
	/------------------*/

	it('`.getAll` fetches all resources', function (done) {
		var fakeResource = makeFakeResource();
		$httpBackend
		.expect('GET', '/api/resources')
		.respond(200, fakeResource);
		ResourceFactory.getAll()
		.then(function (todos) {
			expect(todos).to.deep.equal(fakeResource);
		})
		.catch(done);
		$httpBackend.flush();
		done();
	});

})
