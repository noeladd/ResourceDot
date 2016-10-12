app.config(function($stateProvider) {
  $stateProvider.state('newGuides', {
    url: '/newGuides',
    templateUrl: 'js/new_guides/new_guides.html',
    controller: 'newGuidesCtrl',
    resolve: {
      guides: function(GuideFactory) {
        return GuideFactory.getAll();
      }
    },
    user: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getById(user.id);
        })
      }
  });
});

app.controller('newResourcesCtrl', function($scope, guides, user) {
  $scope.user = user;
  $scope.guides = guides.sort(function(a, b) {
    var dateA = new Date(a.createdAt);
    dateA = Number(dateA);
    var dateB = new Date(b.createdAt);
    dateB = Number(dateB);
    return dateB - dateA;
  }).slice(0, 10);
});
