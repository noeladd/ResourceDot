app.config(function ($stateProvider) {
  $stateProvider.state('friends', {
      url: '/:userId/friends/all',
      templateUrl: 'js/friends/friends.html',
      controller: 'friendsCtrl'
  });
});

app.controller('friendsCtrl', function($scope, $state, UserFactory, $stateParams, $log) {
  UserFactory.getById($stateParams.userId)
  .then(function(user){
    $scope.user = user;
    $scope.friends = user.friend;
  })
  .catch($log.error);
  
  $scope.findFriend = function(friendId) {
    $state.go('friend', {friendId: friendId});
  };
});
