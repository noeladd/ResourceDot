app.config(function($stateProvider) {
    $stateProvider.state('likedResources', {
      url: '/profile/:userId/liked',
      templateUrl: 'js/liked_resources/liked_resources.html',
      controller: 'LikedResourcesCtrl'
    });
});

app.controller('LikedResourcesCtrl', function($scope, UserFactory, $stateParams, $log) {
  return UserFactory.getById($stateParams.userId)
  .then(function(user){
    console.log("USER! :", user)
    $scope.user = user;
    $scope.data = user.resourceLike.slice(0,5);
    $scope.guides = user.guideLike;
  })
  .then(function(){
    $scope.getMoreData = function () {
      $scope.data = $scope.user.resourceLike.slice(0, $scope.data.length + 5)
    }
  })
  .catch($log.error);
});