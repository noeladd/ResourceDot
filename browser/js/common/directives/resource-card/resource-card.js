app.directive('resourceCard', function (ResourceFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/resource-card/resource-card.html',
        scope: true,
        link: function(scope) {
          scope.like = ResourceFactory.like;
          scope.dislike = ResourceFactory.dislike;
        }
    };
});
