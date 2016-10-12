app.config(function($stateProvider) {
  $stateProvider.state('searchResults', {
    url: '/search_results/:tagIds/:tagTitles',
    templateUrl: 'js/search_results/search_results.html',
    controller: 'SearchCtrl',
    resolve: {
      resources: function(ResourceFactory, $stateParams, $filter) {
        let tags = $stateParams.tagIds.split('+');
          tags = tags.map(function(id) {
            return +id;
          });
      return ResourceFactory.getAllByTag(tags)
          .then(function(resources){
             return resources.sort(function(a, b){
               if (a.netLikes > b.netLikes) {
                  return -1;
                }
                if (a.netLikes < b.netLikes) {
                  return 1;
                }
                return 0;
             });
          });
      },
      guides: function(GuideFactory, $stateParams){
        let tags = $stateParams.tagIds.split('+');
          tags = tags.map(function(id) {
          return +id;
        });
        return GuideFactory.getAllByTag(tags);
      },
      user: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          if (!user){
            return {id: 0, name: 'Guest'}
          }
          return UserFactory.getById(user.id);
        })
      }
    }
  });
});

app.controller('SearchCtrl', function($scope, $stateParams, resources, guides, user) {
  $scope.tags = $stateParams.tagTitles.split('+');
  $scope.user = user
  $scope.resources = resources;

  $scope.data = $scope.resources.slice(0, 5);
  $scope.getMoreData = function () {
    $scope.data = $scope.resources.slice(0, $scope.data.length + 5);
  }

  $scope.guides = guides;
  $scope.userGuides = user.guides
});
