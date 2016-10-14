app.config(function ($stateProvider) {
  $stateProvider.state('searchPeople', {
      url: '/search_people',
      templateUrl: 'js/search_people/search_people.html',
      controller: 'searchPeopleCtrl',
      resolve: {
      users: function(UserFactory) {
      	return UserFactory.getAll()
      }
    }
  });
});

app.controller('searchPeopleCtrl', function($scope, $state, users) {
  //$scope.usersbyTag = usersByTag;
  $scope.users = users
  $scope.findFriend = function(userId){
    $state.go('friend', {friendId: userId})
  }
});
