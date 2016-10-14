app.config(function($stateProvider) {
  $stateProvider.state('guideDetail', {
    url: '/guide/:id',
    templateUrl: 'js/guide_detail/guide.html',
    controller: 'GuideCtrl',
    resolve: {
      guide: function(GuideFactory, $stateParams){
        let id = $stateParams.id
        return GuideFactory.getById(id);
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
  })
});

app.controller('GuideCtrl', function($scope, guide, user, GuideFactory, $log, $mdToast) {
  $scope.guide = guide;
  $scope.resources = guide.resources.sort(function(a, b){
    if (b.order > a.order) {
    return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });

  $scope.author = guide.author;
  $scope.user = user
  $scope.sortableOptions = {};

  $scope.updateOrder = function(){
    var newOrder = $scope.resources.map(function(resource){
        return resource.id;
    });
    GuideFactory.updateOrder(guide.id, newOrder)
    .then(function(){
      $mdToast.show($mdToast.simple()
                    .textContent('Guide updated!'));
    })
    .catch($log.error);
  };
});
