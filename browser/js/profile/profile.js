app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'js/profile/profile.html'
  });
});

app.controller('ProfileCtrl', function ($scope, $state, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory, GuideFactory) {
  $scope.loaded = false;
  $scope.selectedTags = [];
  $scope.user = {};

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    $scope.user = fullUser; // gets current user
    $scope.selectedTags = fullUser.tags; // gets user's tags (topics user is interested in)
    $scope.friends = shuffleArray($scope.user.friend).slice(0, 4);
    return GuideFactory.getByAuthor($scope.user.id)
  })
  .then(function(guides) {
    $scope.guides = guides;
    $scope.noGuides = $scope.guides.length === 0;
    if ($scope.selectedTags.length) {
      return fetchResources($scope.selectedTags)
    }
    else {
      $scope.noTags = true;
    }
  })
  .then(function() {
    $scope.loaded = true;
    $scope.$watchCollection('selectedTags', function() {
      _.debounce(updatePage, 1000)();
    });
  })
  .catch($log.error);

  function updatePage() {
    updateTags()
    .then(function(tags){
      if ($scope.selectedTags.length) {
        $scope.noTags = false;
        return fetchResources(tags);
      }
      else {
        $scope.noTags = true;
        $scope.resources = [];
      }
    })
    .catch($log.error);
  }

  // profile page displays: recommended resources, guides created by the user, user's picture & account settings, & user's friends
  function fetchResources(updatedTags) {
    var tags = updatedTags.map(function(tag) {
      return +tag.id;
    });
    return ResourceFactory.getAllByTag(tags)
    .then(function(resources) {
      $scope.resources = RecommendationFactory.get(resources, $scope.user)
      .map(obj => obj.resource).slice(0, 5);
    })
    .then(function(){
      return UserFactory.getByTags(tags)
      .then(function(users){
        if (users.length > 0){
          var suggestedFriends =[];  
          $scope.userFriendsIds = $scope.user.friend.map(function(friend){
            return +friend.id
          })
          users.map(function(user){
            if ($scope.userFriendsIds.indexOf(user.id) === -1 && $scope.user.id !== user.id){
              suggestedFriends.push(user);
            }
          })
          $scope.suggestedFriends = shuffleArray(suggestedFriends).slice(0,4);
        }
      })
    })
    .catch($log.error);
  }


  function updateTags() {
    var tags = $scope.selectedTags.map(function(tag){
      if (typeof tag === 'object') return tag.title;
      else return tag;
    });
    return UserFactory.setTags($scope.user.id, tags)
    .catch($log.error);
  }

  $scope.findFriend = function(friendId) {
    $state.go('friend', {friendId: friendId});
  };

  $scope.findFriends = function(userId) {
    $state.go('friends', {userId: userId});
  }

  $scope.viewLikedResources = function() {
    $state.go('likedResources', {userId: $scope.user.id});
  }

});
