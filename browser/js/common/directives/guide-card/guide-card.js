app.directive('guideCard', function(GuideFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/guide-card/guide-card.html',
        scope: true,
        link: function(scope) {
            let liked = false;
            let disliked = false;
            scope.like = function(id, data){
                if (scope.user.guideLike.filter(function(guide){
                    return guide.id === id
                }).length === 0 && !liked){
                    GuideFactory.like(id, data)
                    .then(function() {
                        liked = true
                        scope.guide.likes += 1;
                    })
                }
            };
            scope.dislike = function(id, data) {
				if (scope.user.guideDislike.filter(function(guide){
					return guide.id === id
				}).length === 0 && !disliked){
					GuideFactory.dislike(id, data)
					.then(function() {
                        disliked = true;
						scope.guide.dislikes += 1;
					})
				}
			};
            scope.findFriend = function(friendId) {
                $state.go('friend', {friendId: friendId});
            };
        }
    }
})
