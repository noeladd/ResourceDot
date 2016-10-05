app.controller('HomeCtrl', function($scope, $filter, TagFactory, ResourceFactory, $state, $log) {
  TagFactory.getAll()
  .then(function(tags){
    var allTags = tags;

    $scope.allTags = allTags;
    $scope.selectedTags = [];

    $scope.queryTags = function(search) {
      var firstPass = allTags.filter(function(tag){
        return tag.title.includes(search);
      });
      return firstPass.filter(function(tag){
        for(var i = 0; i < $scope.selectedTags.length; i++){
          if (tag.title === search) return false;
        }
        return true;
      });
    };

    $scope.addTag = function(group) {
        $scope.selectedTags.push(group);
    };

    $scope.$watchCollection('selectedTags', function() {
        $scope.availableTags = $scope.queryTags('');
    });
  })
  .catch($log.error);

  $scope.search = function() {
    var tags = $scope.selectedTags.map(function(tag) {
      return tag.id;
    });

    return ResourceFactory.getAllByTag(tags)
    .then(function(resources) {
      $state.go('searchResults', {resources: resources});
    });
  };

});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
