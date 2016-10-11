app.config(function($stateProvider) {
  $stateProvider.state('searchAuthorResults', {
    url: '/search_results/:authorName',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchAuthorCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllByAuthor($stateParams.authorName);
      }
    }
  });
});

app.controller('SearchAuthorCtrl', function($scope, resources) {
  $scope.resources = resources;
});
