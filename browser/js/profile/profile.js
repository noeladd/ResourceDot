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
  var user;

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  // profile page displays: recommended resources, guides created by the user, user's picture & account settings, & user's friends
  function fetchResources() {
    if ($scope.selectedTags.length) {
      var tags = $scope.selectedTags.map(function(tag) {
        return tag.id;
      }).join(', ');

      var tagsArr = tags.split(', ');

      UserFactory.setTags(user.id, tagsArr);

      return ResourceFactory.getAllByTag(tags)
      .then(function(resources) {
        $scope.resources = RecommendationFactory.get(resources, $scope.user).map(function(obj){
          return obj.resource;
        }).slice(0, 5);
      })
      .catch($log.error);
    }
    else $scope.noTags = true;
  }

  $scope.viewLikedResources = function() {
    $state.go('likedResources', {userId: $scope.user.id});
  }

  var debounced = _.debounce(fetchResources, 500);

  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    user = fullUser;
    $scope.user = fullUser; // gets current user
    $scope.selectedTags = fullUser.tags; // gets user's tags (topics user is interested in)
    if (!fullUser.tags.length) $scope.noTags = true;
    $scope.friends = shuffleArray(user.friend).slice(0, 4);
    GuideFactory.getByAuthor(user.id)
    .then(function(guides) {
      $scope.guides = guides;
      if (!$scope.guides.length) $scope.noGuides = true;
    })
    .catch($log.error);
    return fetchResources();
    })
    .then(function{
      $scope.loaded = true;
    })
    .catch($log.error);

  $scope.$watchCollection('selectedTags', function() {
    debounced();
  });

  $scope.findFriend = function(friendId) {
    $state.go('friend', {friendId: friendId});
  };

  $scope.findFriends = function(userId) {
    $state.go('friends', {userId: userId});
  }
});
