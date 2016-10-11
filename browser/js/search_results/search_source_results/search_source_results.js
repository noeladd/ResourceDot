app.config(function($stateProvider) {
  $stateProvider.state('searchSourceResults', {
    url: '/search_results/:source',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchSourceCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams) {
        return ResourceFactory.getAllBySource($stateParams.source);
      }
    }
  });
});

app.controller('SearchSourceCtrl', function($scope, resources) {
  $scope.resources = resources;
});
