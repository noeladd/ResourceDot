app.config(function($stateProvider) {
    $stateProvider.state('guideDetail', {
        url: '/guide/:id',
        templateUrl: 'js/guide_detail/guide.html',
        controller: 'GuideCtrl',
        resolve: {
            guide: function(GuideFactory, $stateParams){
                console.log("In guide resolve!")
                let id = $stateParams.id
                return GuideFactory.getById(id);
            },
           user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                .then(function(user){
                return UserFactory.getById(user.id);
                })
            }
        }
    })
});

app.controller('GuideCtrl', function($scope, guide, user) {

    $scope.guide = guide;
    $scope.resources = guide.resources;
    $scope.author = guide.author;
    $scope.user = user

})
