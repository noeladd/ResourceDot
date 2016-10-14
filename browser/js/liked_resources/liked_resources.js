app.config(function($stateProvider) {
    $stateProvider.state('likedResources', {
      url: '/profile/:userId/liked',
      templateUrl: 'js/liked_resources/liked_resources.html',
      controller: 'LikedResourcesCtrl',
      resolve: {
        user: function(UserFactory, $stateParams){
          let id = $stateParams.userId;
          return UserFactory.getById(id);
        }
      }
    });
});

app.controller('LikedResourcesCtrl', function($scope, user) {
    $scope.likedResources = user.resourceLike;
    $scope.user = user;
    $scope.guides = user.guides;
});
