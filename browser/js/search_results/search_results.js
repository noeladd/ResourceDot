app.controller('SearchCtrl', function($scope, $stateParams) {
  $scope.resources = $stateParams.resources;
});

app.config(function($stateProvider) {
  $stateProvider.state('searchResults', {
    url: '/search_results',
    templateUrl: 'js/search_results/search_results.html',
    params: {
      resources: null
    }
    });
});
