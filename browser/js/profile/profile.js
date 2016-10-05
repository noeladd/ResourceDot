app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileController',
      templateUrl: 'js/profile/profile.html'
  });

});

app.controller('ProfileController', function ($scope, TagFactory, UserFactory, AuthService, $log, ResourceFactory) {

  AuthService.getLoggedInUser()
  .then(function(user){
     return UserFactory.getById(user.id);
  })
  .then(function(fullUser){
    $scope.user = fullUser;
    return ResourceFactory.getAllByTag(1);
  })
  .then(function(resources){
    $scope.resources = ResourceFactory.getRecommendations(resources, $scope.user);
  })
  .catch($log.error)

});
