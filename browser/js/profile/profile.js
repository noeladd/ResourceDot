app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'js/profile/profile.html'
  });
});

app.controller('ProfileCtrl', function ($scope, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory) {
  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    $scope.user = fullUser;
    $scope.userTags = fullUser.tags;
    var tags = fullUser.tags.map(function(tag){
      return tag.id;
    }).join(',');
    return ResourceFactory.getAllByTag(tags);
  })
  .then(function(resources){
    $scope.resources = RecommendationFactory.get(resources, $scope.user).map(function(obj){
      return obj.resource;
    }).slice(0, 5);
  })
  .catch($log.error);
});
