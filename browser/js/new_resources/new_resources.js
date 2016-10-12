app.config(function($stateProvider) {
  $stateProvider.state('newResources', {
    url: '/newResources',
    templateUrl: 'js/new_resources/new_resources.html',
    controller: 'newResourcesCtrl',
    resolve: {
      resources: function(ResourceFactory) {
        return ResourceFactory.getAll();
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

app.controller('newResourcesCtrl', function($scope, resources, user) {
  $scope.resources = resources.sort(function(a, b) {
    var dateA = new Date(a.createdAt);
    dateA = Number(dateA);
    var dateB = new Date(b.createdAt);
    dateB = Number(dateB);
    return dateB - dateA;
  }).slice(0, 10);
  $scope.user = user;
});
