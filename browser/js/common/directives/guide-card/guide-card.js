app.directive('guideCard', function(GuideFactory, $state, $log) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/guide-card/guide-card.html',
        scope: true,
        link: function(scope) {
          let liked = scope.user.guideLike.filter(function(item) {
                        return item.id === scope.guide.id;
                        }).length === 1;

          let disliked = scope.user.guideDislike.filter(function(item) {
                          return item.id === scope.guide.id;
                          }).length === 1;

          scope.like = function(id) {
            if (scope.user.guideLike.filter(function(guide) {
              return guide.id === id;
            }).length === 0 && !liked){
              GuideFactory.like(id)
              .then(function() {
                liked = true;
                scope.guide.likes += 1;

                if (disliked) {
                  disliked = false;
                  scope.guide.dislikes -= 1;
                  return GuideFactory.removeDislike(id, scope.user.id);
                }
              })
              .catch($log.error);
          }
        };

        scope.dislike = function(id) {
          if (scope.user.guideDislike.filter(function(guide){
            return guide.id === id;
          }).length === 0 && !disliked){
            GuideFactory.dislike(id)
            .then(function() {
              disliked = true;
              scope.guide.dislikes += 1;

              if (liked) {
                liked = false;
                scope.guide.likes -= 1;
                return GuideFactory.removeLike(id, scope.user.id);
              }
            })
            .catch($log.error);
          }
        };

            scope.findFriend = function(friendId) {
                $state.go('friend', {friendId: friendId});
            };
        }
    };
});
