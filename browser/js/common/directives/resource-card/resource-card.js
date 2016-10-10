app.directive('resourceCard', function ($state, ResourceFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/resource-card/resource-card.html',
		scope: true,
		link: function(scope) {
			scope.like = function(id) {
				ResourceFactory.like(id)
				.then(function() {
					scope.resource.likes += 1;
				})
			}

			scope.dislike = function(id) {
				ResourceFactory.dislike(id)
				.then(function() {
					scope.resource.dislikes += 1;
				})
			}

			scope.searchByTag = function(id) {
				$state.go('searchResults', {tagIds: id});
			}
		}
	}
});
