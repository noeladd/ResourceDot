app.config(function ($stateProvider) {
  $stateProvider.state('friend', {
      url: '/friends/:friendId',
      templateUrl: 'js/friend/friend.html',
      controller: 'friendCtrl',
      resolve: {
        friend: function(UserFactory, $stateParams) {
          return UserFactory.getById($stateParams.friendId);
        },
        guides: function(GuideFactory, $stateParams) {
          return GuideFactory.getByAuthor($stateParams.friendId);
        }
      }
  });
});

app.controller('friendCtrl', function($scope, $state, friend, guides) {
  $scope.friend = friend;
  $scope.guides = guides;

  $scope.search = function(tagId) {
    $state.go('searchResults', {tagIds: tagId});
  };
});
