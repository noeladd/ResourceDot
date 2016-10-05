app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileController',
      templateUrl: 'js/profile/profile.html'
  });

});

app.controller('ProfileController', function ($scope, TagFactory, UserFactory, AuthService, $log, ResourceFactory, RecommendationFactory) {

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
    });
  })
  .catch($log.error)

  $scope.like = ResourceFactory.like;
  $scope.dislike = ResourceFactory.dislike;

});
