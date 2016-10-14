app.directive('resourceCard', function ($state, $log, ResourceFactory, GuideFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/resource-card/resource-card.html',
    scope: true,
    link: function(scope, element) {
      let liked = scope.user.resourceLike.filter(function(item) {
        return item.id === scope.resource.id;
      }).length === 1;

      let disliked = scope.user.resourceDislike.filter(function(item) {
        return item.id === scope.resource.id;
      }).length === 1;

      scope.like = function(id) {
        if (scope.user.resourceLike.filter(function(resource){
          return resource.id === id;
        }).length === 0 && !liked){
          ResourceFactory.like(id)
          .then(function() {
            liked = true;
            scope.resource.likes += 1;
            if (disliked) {
              disliked = false;
              scope.resource.dislikes -= 1;
              return ResourceFactory.removeDislike(id, scope.user.id);
            }
          })
        .catch($log.error);
        }
      };

      scope.dislike = function(id) {
        if (scope.user.resourceDislike.filter(function(resource){
          return resource.id === id;
        }).length === 0 && !disliked){
          ResourceFactory.dislike(id)
          .then(function() {
            disliked = true;
            scope.resource.dislikes += 1;
            if (liked) {
              liked = false;
              scope.resource.likes -= 1;
              return ResourceFactory.removeLike(id, scope.user.id);
            }
          })
          .catch($log.error);
        }
      };

      scope.userGuides = scope.user.guides;

      scope.searchByTag = function(id, title) {
        $state.go('searchResults', {tagIds: id, tagTitles: title});
      }

      scope.searchByAuthor = function(authorName) {
        $state.go('searchAuthorResults', {authorName: authorName});
      }

      scope.searchBySource = function(source) {
        $state.go('searchSourceResults', {source: source})
      }

			scope.delete = function(id){
				if (scope.user.isAdmin){
					ResourceFactory.delete(id)
					.then(function(){
						element.html('');
					})
				}
			}

      scope.remove = function(id){
        if (scope.user.id === scope.author.id){
          GuideFactory.removeResource(scope.guide.id, {id: id})
          .then(function() {
            element.html('');
          })
        }
      }
    }
  }
});
