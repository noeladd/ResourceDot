app.config(function($stateProvider) {
  $stateProvider.state('searchAuthorResults', {
    url: '/search_results/:authorName',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchAuthorCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllByAuthor($stateParams.authorName);
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

app.controller('SearchAuthorCtrl', function($scope, resources, user) {
  $scope.user = user;
  $scope.resources = resources;
});
