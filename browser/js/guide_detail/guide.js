app.config(function($stateProvider) {
  $stateProvider.state('guideDetail', {
    url: '/guide/:id',
    templateUrl: 'js/guide_detail/guide.html',
    controller: 'GuideCtrl'
  })
});

app.controller('GuideCtrl', function ($scope, GuideFactory, $log, $mdToast, $state, UserFactory, AuthService, $stateParams) {
  // $scope.guide = guide;
  AuthService.getLoggedInUser()
  .then(function(user){
    if (!user){
      $scope.user = {id: 0, name: 'Guest', friend: [], resourceLike: [], resourceDislike: [], guideLike: [], guideDislike: []}
          }
      UserFactory.getById(user.id)
      .then(function(foundUser){
        $scope.user = foundUser;
      })
    })
    .catch($log.error)

  GuideFactory.getById($stateParams.id)
  .then(function(guide){
    $scope.guide = guide;
    $scope.author = guide.author
    $scope.resources = guide.resources.sort(function(a, b){
      if (b.order > a.order) {
      return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  })
  .catch($log.error);

  $scope.deleteGuide = function(id){
    return GuideFactory.delete(id)
    .then(function(){
      $state.go('profile');
    })
  }
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

