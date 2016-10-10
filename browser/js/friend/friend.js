app.config(function ($stateProvider) {
  $stateProvider.state('friend', {
      url: '/friends/:friendId',
      templateUrl: 'js/friend/friend.html',
      controller: 'friendCtrl',
      resolve: {
        friend: function(UserFactory, $stateParams) {
          return UserFactory.getById($stateParams.friendId);
        }
      }
  });
});

app.controller('friendCtrl', function($scope, friend) {
  $scope.friend = friend;
});
