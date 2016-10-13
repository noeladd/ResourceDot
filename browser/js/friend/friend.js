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
  // generate array of userFriends' id's
  $scope.userFriendsIds = $scope.userFriends.map(function(friend) {
    return friend.id;
  })
  $scope.friend = friend;
  $scope.guides = guides;

  $scope.follow = function(friendId) {
    UserFactory.addFriend($scope.user.id, {friendId: friendId})
    .then(function() {
      console.log('friend added');
    })
  }

  $scope.search = function(tagId) {
    $state.go('searchResults', {tagIds: tagId});
  };
});
