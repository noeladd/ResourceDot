app.config(function ($stateProvider) {
  $stateProvider.state('friend', {
      url: '/friends/:friendId',
      templateUrl: 'js/friend/friend.html',
      controller: 'friendCtrl',
  });
});
app.controller('friendCtrl', function($scope, $state, UserFactory, $stateParams, GuideFactory, AuthService) {
 
  AuthService.getLoggedInUser()
  .then(function(user){
    if (!user){
      $scope.user = {id: 0, name: 'Guest', friend: [], resourceLikes: [], resourceDislikes: [], guideLikes: [], guideDislikes: []}
    }
    else {
      UserFactory.getById(user.id)
      .then(function(foundUser){
        console.log("Found User", foundUser)
        $scope.user = foundUser;
        $scope.userFriends = foundUser.friend
        $scope.userFriendsIds = $scope.userFriends.map(function(userFriend) {
          return userFriend.id;
        })
      })
    }
  })
  UserFactory.getById($stateParams.friendId)
  .then(function(friend){
    $scope.friend = friend;
  })

  GuideFactory.getByAuthor($stateParams.friendId)
  .then(function(guides){
    $scope.guides = guides
  })

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
