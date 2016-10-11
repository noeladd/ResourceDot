app.config(function($stateProvider) {
    $stateProvider.state('guideDetail', {
        url: '/guide/:id',
        templateUrl: 'js/guide_detail/guide.html',
        controller: 'GuideCtrl',
        resolve: {
            guide: function(GuideFactory, $stateParams){
                let id = $stateParams.id
                return GuideFactory.getById(id);
            }
        }
    });
});

app.controller('GuideCtrl', function($scope, guide) {
    console.log(guide.resources)
    $scope.guide = guide;
    $scope.resources = guide.resources
})
