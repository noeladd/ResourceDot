app.config(function($stateProvider) {
  $stateProvider.state('newResources', {
    url: '/newResources',
    templateUrl: 'js/new_resources/new_resources.html',
    controller: 'newResourcesCtrl',
    resolve: {
      resources: function(ResourceFactory) {
        return ResourceFactory.getAll();
      }
    }
  });
});

app.controller('newResourcesCtrl', function($scope, resources) {
  $scope.resources = resources.sort(function(a, b) {
    var dateA = new Date(a.createdAt);
    dateA = Number(dateA);
    var dateB = new Date(b.createdAt);
    dateB = Number(dateB);
    return dateB - dateA;
  }).slice(0, 10);
});
