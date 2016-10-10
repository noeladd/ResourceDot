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
            user: function(AuthService){
                return AuthService.getLoggedInUser()
            }
        }
    });
});

app.controller('GuideCtrl', function($scope, guide, user, UserFactory) {

    $scope.guide = guide;
    $scope.resources = guide.resources;
    $scope.author = guide.author;
    UserFactory.getById(user.id)
    .then(function(user){
        $scope.user = user;
    })
})
