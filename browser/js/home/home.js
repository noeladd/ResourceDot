app.controller('HomeCtrl', function($scope, $filter, TagFactory, ResourceFactory, $state, $log) {
  $scope.selectedTags = [];
  
  $scope.search = function() {
    console.log('called search!');
    var tags = $scope.selectedTags.map(function(tag) {
      return tag.id;
    });
    tags = tags.join('+');
    $state.go('searchResults', {tagIds: tags});
  };
});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
