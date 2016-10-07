app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'js/profile/profile.html'
  });
});

app.controller('ProfileCtrl', function ($scope, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory) {
  $scope.selectedTags = [];

  // profile page displays: recommended resources, guides created by the user, user's picture & account settings, & user's friends
  function fetchResources() {
    var tags = $scope.selectedTags.map(function(tag) {
      return tag.id;
    }).join(', ');

    return ResourceFactory.getAllByTag(tags)
    .then(function(resources) {
      $scope.resources = RecommendationFactory.get(resources, $scope.user).map(function(obj){ // gets an array of recommended resources (many of them!)
        return obj.resource;
      }).slice(0, 5);
    })
    .catch($log.error);
  }

  var debounced = _.debounce(fetchResources, 1000);

  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    $scope.user = fullUser; // gets current user
    $scope.selectedTags = fullUser.tags; // gets user's tags (topics user is interested in)
    return fetchResources();
  })
  .catch($log.error);

  $scope.$watchCollection('selectedTags', function() {
    debounced();
  });
});
