app.config(function ($stateProvider) {
  $stateProvider.state('friends', {
      url: '/:userId/friends/all',
      templateUrl: 'js/friends/friends.html',
      controller: 'friendsCtrl'
  });
});

app.controller('friendsCtrl', function($scope, $state, UserFactory, $stateParams) {
  UserFactory.getById($stateParams.userId)
  .then(function(user){
    $scope.user = user;
    $scope.friends = user.friend;
  })
  $scope.findFriend = function(friendId) {
    $state.go('friend', {friendId: friendId});
  };
});
