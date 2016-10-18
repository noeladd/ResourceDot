'use strict';

describe('<resource-card> directive', function() {

	// load our Angular app from scratch
	beforeEach(module('FullstackGeneratedApp', 'karmaTemplates'));

	var $compile, $rootScope, directiveDefinition, parentScope;
	beforeEach('Get tools', inject(function (_$compile_, _$rootScope_, $templateCache, resourceCardDirective) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		directiveDefinition = resourceCardDirective[0];
		parentScope = $rootScope.$new();
	}));

	// take a look at karma.conf.js to understand why templateUrl is the way it's written below (aka why we omitted 'browser/')
	it('is an element directive that uses js/common/directives/resource-card/resource-card.html as its templateUrl', function () {
		expect(directiveDefinition.restrict).to.be.equal('E');
		expect(directiveDefinition.templateUrl).to.be.equal('js/common/directives/resource-card/resource-card.html');
	});

	describe('functionality', function () {
		beforeEach(function() {
			// imitating the instantiation of scope.user & scope.resource; in our app they are inherited from the environment surrounding the directive
			parentScope.user = {
				id: 1,
				name: 'sungwon ma',
				resourceLike: [{
					authorName: 'sungwon',
					link: 'sw.com',
					source: 'company',
					tags: [],
					type: 'article'
				}],
				resourceDislike: []
			}
			parentScope.resource = {
				id: 1,
				author: 'coolAuthor',
				source: 'real cool source'
			}
		})

		var directiveElement;
		beforeEach('Compile an instance of the directive', function () {
			var html = '<resource-card></resource-card>';
			directiveElement = $compile(html)(parentScope); // creates a jQuery instance
			$rootScope.$digest();
		})

		//testing directive behaviors
		it('goes to a state called "searchSourceResults" with the source\'s name as the $stateParams.source when the source name is clicked', function (done) {

			$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
				expect(toState.name).to.be.equal('searchSourceResults');
				expect(toStateParams.source).to.be.equal(parentScope.resource.source);
				done();
			});

			directiveElement.find('.searchBySource').eq(0).triggerHandler('click');
		});

		it('goes to a state called "searchAuthorResults" with the source\'s author name as the $stateParams.authorName when the source\'s author name is clicked', function (done) {

			$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
				expect(toState.name).to.be.equal('searchAuthorResults');
				expect(toStateParams.authorName).to.be.equal(parentScope.resource.author);
				done();
			});

			directiveElement.find('.searchByAuthor').eq(0).triggerHandler('click');
		})
	})
})
