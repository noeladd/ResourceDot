app.controller('HomeCtrl', function($scope, $filter, TagFactory, ResourceFactory, $state, $log) {
  $scope.selectedTags = [];

  $scope.search = function() {
    var tags = $scope.selectedTags.map(function(tag) {
      return tag.id;
    });

    var tagTitles = $scope.selectedTags.map(function(tag) {
      return tag.title;
    });

    tagTitles = tagTitles.join('+');
    tags = tags.join('+');
    $state.go('searchResults', {tagIds: tags, tagTitles: tagTitles});
  };
});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
