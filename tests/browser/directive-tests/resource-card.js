'use strict';

xdescribe('<resource-card> directive', function() {
	/*------------------
		CONFIGURATION
	/------------------*/

	//load our Angular app from scratch
	beforeEach(module('FullstackGeneratedApp', 'karmaTemplates'));

	var $compile, $rootScope, directiveDefinition, parentScope;
	beforeEach('Get tools', inject(function (_$compile_, _$rootScope_, $templateCache, resourceCardDirective) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		directiveDefinition = resourceCardDirective[0];
		parentScope = $rootScope.$new();
	}));

	it('is an element directive that uses js/common/directives/resource-card/resource-card.html as its templateUrl', function () {
		expect(directiveDefinition.restrict).to.be.equal('E');
		expect(directiveDefinition.templateUrl).to.be.equal('js/common/directives/resource-card/resource-card.html');
	});

		/*------------------
			TESTS
		/------------------*/
	describe('functionality', function () {
		beforeEach(function() {
			// creating scope.user
			parentScope.user = {
				id: 1,
				name: 'sungwon ma',
				resourceLike: [{
					author: 'sungwon',
					link: 'sw.com',
					source: 'sungwon company',
					tags: [],
					type: 'article'
				}],
				resourceDislike: []
			}
			parentScope.resource = {
				id: 1
			}
		})

		var directiveElement;
		beforeEach('Compile an instance of the directive', function () {
			var html = '<resource-card></resource-card>';
			directiveElement = $compile(html)(parentScope);
			$rootScope.$digest();
		})

		//test directive behaviors here
	})
})
