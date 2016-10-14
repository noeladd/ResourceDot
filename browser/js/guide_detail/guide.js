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

app.controller('GuideCtrl', function($scope, guide, user) {
  $scope.guide = guide;
  $scope.resources = guide.resources;
  $scope.data = $scope.resources.slice(0,5);
  $scope.getMoreData = function () {
    $scope.data = $scope.resources.slice(0, $scope.data.length + 5);
  }
  $scope.author = guide.author;
  $scope.user = user
})
