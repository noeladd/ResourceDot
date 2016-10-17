app.config(function($stateProvider) {
  $stateProvider.state('searchResults', {
    url: '/search_results/tags/:tagIds/:tagTitles',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchCtrl',
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

app.controller('SearchCtrl', function($scope, $stateParams, ResourceFactory, GuideFactory, user, $log) {
  $scope.tags = $stateParams.tagTitles.split('+');
  let tags = $stateParams.tagIds.split('+')
    tags = tags.map(function(id){
    return +id;
  });
  $scope.user = user;
  ResourceFactory.getAllByTag(tags)
  .then(function(resources){
    $scope.resources = resources.sort(function(a, b){
            if (a.netLikes > b.netLikes) {
              return -1;
            }
            if (a.netLikes < b.netLikes) {
              return 1;
            }
            return 0;
   })
   $scope.data = $scope.resources.slice(0, 5);
  })
  .then(function(){
    $scope.getMoreData = function () {
      $scope.data = $scope.resources.slice(0, $scope.data.length + 5);
    }
  })
  .catch($log.error);

  GuideFactory.getAllByTag(tags)
  .then(function(guides){
    $scope.guides = guides;
  })
  .catch($log.error);

  $scope.userGuides = user.guides;
});

