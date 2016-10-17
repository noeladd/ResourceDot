app.config(function ($stateProvider) {
  $stateProvider.state('searchPeople', {
      url: '/search_people',
      templateUrl: 'js/search_people/search_people.html',
      controller: 'searchPeopleCtrl'
  });
});

app.controller('searchPeopleCtrl', function($scope, $state, UserFactory, $log) {
  UserFactory.getAll()
  .then(function(users){
    $scope.users = users;
  })
  .catch($log.error);

  $scope.findFriend = function(userId){
    $state.go('friend', {friendId: userId})
  }
});
