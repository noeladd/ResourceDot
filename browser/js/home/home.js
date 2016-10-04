app.controller('HomeCtrl', function($scope, TagFactory) {
  $scope.ctrl = {};

  TagFactory.getTags()
  .then(function(tags){
    $scope.ctrl.readonly = false;
    $scope.ctrl.selectedItem = null;
    $scope.ctrl.searchText = null;
    $scope.ctrl.querySearch = querySearch;
    $scope.ctrl.searchTags = tags;
    $scope.ctrl.selectedTags = [];
    $scope.ctrl.numberChips = [];
    $scope.ctrl.numberChips2 = [];
    $scope.ctrl.numberBuffer = '';
    $scope.ctrl.autocompleteDemoRequireMatch = true;
    $scope.ctrl.transformChip = transformChip;
  });
    function querySearch (query) {
      var results = query ? $scope.ctrl.searchTags.filter(createFilterFor(query)) : [];
      return results;
    }

    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' };
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tag) {
        return tag.title === lowercaseQuery;
      };

    }
  });

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});
