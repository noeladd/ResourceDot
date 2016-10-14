app.config(function ($stateProvider) {
  $stateProvider.state('friend', {
      url: '/friends/:friendId',
      templateUrl: 'js/friend/friend.html',
      controller: 'friendCtrl',
      resolve: {
        friend: function(UserFactory, $stateParams) {
          return UserFactory.getById($stateParams.friendId);
        },
        guides: function(GuideFactory, $stateParams) {
          return GuideFactory.getByAuthor($stateParams.friendId);
        },
        user: function(AuthService, UserFactory){
          return AuthService.getLoggedInUser()
          .then(function(user){
            if (!user){
              return {id: 0, name: 'Guest'}
            }
            return UserFactory.getById(user.id);
          })
        }
      }
  });
});

app.controller('friendCtrl', function($scope, $state, UserFactory, friend, guides, user) {
  $scope.user = user;
  $scope.userFriends = $scope.user.friend;
  $scope.userFriendsIds = $scope.userFriends.map(function(userFriend) {
    return userFriend.id;
  })
  $scope.friend = friend;
  $scope.guides = guides;

  $scope.follow = function(friendId) {
    return UserFactory.addFriend($scope.user.id, {friendId: friendId})
    .then(function() {
      $scope.userFriendsIds.push(friendId);
    })
  }

  $scope.search = function(tagId) {
    $state.go('searchResults', {tagIds: tagId});
  };

  $scope.unfollow = function(friendId) {
    return UserFactory.deleteFriend($scope.user.id, friendId)
    .then(function() {
      var index = $scope.userFriendsIds.indexOf(friendId);
      if (index > -1) {
        $scope.userFriendsIds.splice(index, 1);
      }
    })
  }
});
