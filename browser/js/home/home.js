app.controller('HomeCtrl', function($scope, $filter, TagFactory, ResourceFactory, $state, $log) {
  $scope.selectedTags =[];
  $scope.search = function() {
    var tags = $scope.selectedTags.map(function(tag) {
      return tag.id;
    });

    return ResourceFactory.getAllByTag(tags)
    .then(function(resources) {
      $state.go('searchResults', {resources: resources});
    })
    .catch($log.error);
  };
});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
