app.directive('resourceCard', function ($state, ResourceFactory, GuideFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/resource-card/resource-card.html',
        scope: true,
        link: function(scope) {
			scope.like = function(id, data) {
				if (scope.user.resourceLike.filter(function(resource){
					return resource.id === id
				}).length === 0){
					ResourceFactory.like(id, data)
					.then(function() {
						scope.resource.likes += 1;
					})
				}
			}

			scope.dislike = function(id, data) {
				if (scope.user.resourceDislike.filter(function(resource){
					return resource.id === id
				}).length === 0){
					ResourceFactory.dislike(id, data)
					.then(function() {
						scope.resource.dislikes += 1;
					})
				}
			}

			scope.searchByTag = function(id) {
				$state.go('searchResults', {tagIds: id});
			}

			scope.delete = function(id){
				if (scope.user.isAdmin){
					ResourceFactory.delete(id)
				}
			}

			scope.remove = function(id){
				if (scope.user.id === scope.author.id){
					console.log(scope.guide);
					GuideFactory.removeResource(scope.guide.id, {id: id});
				}
			}
        }
	}
});
