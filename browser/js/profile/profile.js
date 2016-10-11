app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'js/profile/profile.html'
  });
});

app.controller('ProfileCtrl', function ($scope, $state, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory) {
  $scope.selectedTags = [];
  var user;
  function fetchResources() {
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

  $scope.viewLikedResources = function() {
    $state.go('likedResources', {userId: $scope.user.id});
  }

  var debounced = _.debounce(fetchResources, 1000);

  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    user = fullUser;
    $scope.user = fullUser;
    $scope.selectedTags = fullUser.tags;
    return fetchResources();
  })
  .catch($log.error);

  $scope.$watchCollection('selectedTags', function() {
    debounced();
  });
});
