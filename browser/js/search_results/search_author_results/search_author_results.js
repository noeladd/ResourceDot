app.config(function($stateProvider) {
  $stateProvider.state('searchAuthorResults', {
    url: '/search_results/author/:authorName',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchAuthorCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllByAuthor($stateParams.authorName);
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

app.controller('SearchAuthorCtrl', function($scope, resources, user, $stateParams) {
  $scope.author = $stateParams.authorName;
  $scope.user = user;
  $scope.data = resources;
  $scope.guides = [];
});
