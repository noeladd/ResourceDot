app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($log, $scope, AuthService, $state, TagFactory) {

    $scope.checkInfo = {};
    $scope.error = null;
    $scope.user = {};

    $scope.sendSignUp = function(signUpInfo) {
        $scope.error = null;

        if ($scope.user.password !== $scope.user.passwordConfirm) {
            $scope.error = 'Passwords do not match, please re-enter password.';
        }
        else {
            AuthService.signup(signUpInfo)
            .then(function(){
                $state.go('home');
            })
            .catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        }
    };

    TagFactory.getAll()
    .then(function(tags){
    var allTags = tags;

    $scope.allTags = allTags;
    $scope.user.tags = [];

    $scope.queryTags = function(search) {
      var firstPass = allTags.filter(function(tag){
        return tag.title.includes(search.toLowerCase());
      });
      return firstPass.filter(function(tag){
        for(var i = 0; i < $scope.user.tags.length; i++){
          if (tag.title === search) return false;
        }
        return true;
      });
    };

    $scope.addTag = function(group) {
        $scope.user.tags.push(group);
    };

    $scope.$watchCollection('user.tags', function() {
        $scope.availableTags = $scope.queryTags('');
    });
  })
  .catch($log.error);

});
