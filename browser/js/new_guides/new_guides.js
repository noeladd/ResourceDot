app.config(function($stateProvider) {
  $stateProvider.state('newGuides', {
    url: '/newGuides',
    templateUrl: 'js/new_guides/new_guides.html',
    controller: 'newGuidesCtrl',
    resolve:{
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

app.controller('newGuidesCtrl', function($scope, GuideFactory, UserFactory, AuthService, $log, user) {
  GuideFactory.getAll()
  .then(function(guides){
    $scope.guides = guides.sort(function(a, b){
      let dateA = new Date(a.createdAt);
      dateA = Number(dateA);
      let dateB = new Date(b.createdAt);
      dateB = Number(dateB);
      return dateB - dateA;
    }).slice(0,10);
  })
  .catch($log.error)

  $scope.user = user;
});
