app.config(function($stateProvider) {
  $stateProvider.state('searchSourceResults', {
    url: '/search_results/source/:source',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchSourceCtrl',
    resolve: {
      user: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          if (!user){
            return {id: 0, name: 'Guest', friend: [], resourceLike: [], resourceDislike: [], guideLike: [], guideDislike: []}
          }
          return UserFactory.getById(user.id);
        })
      }
    }
  });
});

app.controller('SearchSourceCtrl', function($scope, ResourceFactory, $log, user, $stateParams) {
  $scope.source = $stateParams.source
  $scope.user = user
  $scope.guides = [];
  ResourceFactory.getAllBySource($stateParams.source)
  .then(function(resources){
    $scope.resources = resources
    $scope.data = $scope.resources.slice(0, 5);
  })
  .then(function(){
    $scope.getMoreData = function(){
      $scope.data = $scope.resources.slice(0, $scope.data.length + 5);
    }
  })
  .catch($log.error);
});
