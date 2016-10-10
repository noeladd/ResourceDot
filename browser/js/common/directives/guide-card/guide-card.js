app.directive('guideCard', function(GuideFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/guide-card/guide-card.html',
        scope: true,
        link: function(scope) {
            scope.like = GuideFactory.like;
            scope.dislike = GuideFactory.dislike
        }
    }
})
