app.controller('HomeCtrl', function($scope, $filter, TagFactory, $log) {
  TagFactory.getTags()
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

});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
