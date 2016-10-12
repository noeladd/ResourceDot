app.config(function($stateProvider) {
  $stateProvider.state('searchSourceResults', {
    url: '/search_results/:source',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchSourceCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllBySource($stateParams.source);
      },
      user: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getById(user.id);
        })
      }
    }
  });
});

app.controller('SearchSourceCtrl', function($scope, resources, user) {
  $scope.user = user
  $scope.resources = resources.splice(0, 100);
});
