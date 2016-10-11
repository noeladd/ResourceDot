app.config(function($stateProvider) {
  $stateProvider.state('searchResults', {
    url: '/search_results/:tagIds',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        let tags = $stateParams.tagIds.split('+');
          tags = tags.map(function(id) {
            return +id;
          });
      return ResourceFactory.getAllByTag(tags);
      },
      guides: function(GuideFactory, $stateParams){
        let tags = $stateParams.tagIds.split('+');
          tags = tags.map(function(id) {
          return +id;
        });
        return GuideFactory.getAllByTag(tags);
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

app.controller('SearchCtrl', function($scope, resources, guides, user) {
  $scope.resources = resources;
  $scope.guides = guides;
  $scope.user = user;
  $scope.userGuides = user.guides
});
