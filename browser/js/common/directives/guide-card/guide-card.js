app.directive('guideCard', function(GuideFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/guide-card/guide-card.html',
        scope: true,
        link: function(scope) {
            let liked = false;
            let disliked = false;
            console.log("Link Function")
            scope.like = function(id, data){
                console.log( "In scope.like!!!");
                if (scope.user.guideLike.filter(function(guide){
                    return guide.id === id
                }).length === 0 && !liked){
                    GuideFactory.like(id, data)
                    .then(function() {
                        console.log("I'm LINE 16")
                        liked = true
                        console.log("After Switch:", liked);
                        scope.guide.likes += 1;
                        console.log('\n\n\n\n\n omgggg');
                    })
                }
            }
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
			}
        }
    }
})
