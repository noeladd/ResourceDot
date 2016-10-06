app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'js/profile/profile.html'
  });
});

app.controller('ProfileCtrl', function ($scope, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory) {
  // profile page displays: recommended resources, guides created by the user, user's picture & account settings, & user's friends
  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    $scope.user = fullUser; // gets current user
    $scope.userTags = fullUser.tags; // gets user's tags (topics user is interested in)
    var tags = fullUser.tags.map(function(tag){
      return tag.id;
    }).join(',');
    return ResourceFactory.getAllByTag(tags); // gets all resources with user's tags
  })
  .then(function(resources){
    $scope.resources = RecommendationFactory.get(resources, $scope.user).map(function(obj){ // gets an array of recommended resources (many of them!)
      return obj.resource;
    }).slice(0, 5);
  })
  .catch($log.error);

  // $scope.like = ResourceFactory.like; // allows the user to "like" a resource; need to pass in resourceId as param
  // $scope.dislike = ResourceFactory.dislike; // allows the user to "dislike" a resource; need to pass in resourceId as param

});
