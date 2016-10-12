app.config(function($stateProvider) {
  $stateProvider.state('searchSourceResults', {
    url: '/search_results/source/:source',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchSourceCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllBySource($stateParams.source);
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

app.controller('SearchSourceCtrl', function($scope, resources, user, $stateParams) {
  $scope.source = $stateParams.source
  $scope.user = user
  $scope.data = resources.splice(0, 100);
});
