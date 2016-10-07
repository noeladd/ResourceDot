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
      }
    }
  });
});

app.controller('SearchCtrl', function($scope, resources) {
  $scope.resources = resources;
});
