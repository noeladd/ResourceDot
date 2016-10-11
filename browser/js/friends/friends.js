app.config(function ($stateProvider) {
  $stateProvider.state('friends', {
      url: '/:userId/friends/all',
      templateUrl: 'js/friends/friends.html',
      controller: 'friendsCtrl',
      resolve: {
        user: function(UserFactory, $stateParams) {
          return UserFactory.getById($stateParams.userId);
        }
      }
  });
});

app.controller('friendsCtrl', function($scope, $state, user) {
  $scope.friends = user.friend;

  $scope.findFriend = function(friendId) {
    $state.go('friend', {friendId: friendId});
  };
});
