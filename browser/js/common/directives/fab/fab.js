app.directive('fab', function ($mdDialog, AuthService, $log, UserFactory, $rootScope, AUTH_EVENTS, ResourceFactory, $mdToast, GuideFactory) {
return {
    restrict: 'E',
    templateUrl: 'js/common/directives/fab/fab.html',
    scope: true,
    link: function(scope) {
      scope.resource = {tags: []};
      scope.types = [
        'article',
        'book',
        'blog',
        'podcast',
        'website'
      ];

      scope.openToast = function() {
        $mdToast.show($mdToast.simple()
                      .textContent('Resource created!'));
      };

      var getGuides = function(){
        AuthService.getLoggedInUser()
        .then(function (user) {
          if (!user) {
            scope.loggedIn = false;
            return [];
          }
          else {
            scope.loggedIn = true;
            return UserFactory.getById(user.id);
          }
        })
        .then(function(fullUser){
          scope.guides = fullUser.guides;
        })
        .catch($log.error);
      };

      var clearGuides = function(){
        scope.guides = [];
        scope.loggedIn = false;
      }

      scope.showDialog = function() {
        $mdDialog.show({
          contentElement: '#resourceDialog',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          escapeToClose: true
        });
      };

      scope.clearForm = function(){
        scope.resourceForm.$setPristine();
        scope.resourceForm.$setUntouched();
        scope.resource = {tags: []};
      }

      scope.submitForm = function(){
        if (scope.resource.tags.length === 0){
            scope.resourceForm.tags.$invalid = true;
        }
        else if (scope.resourceForm.$valid) {
          ResourceFactory.post(scope.resource)
          .then(function(newResource){
            if (scope.resource.guide) {
              var guideId = scope.resource.guide;
              return GuideFactory.addResource(guideId, newResource)
            }
            else return;
          })
          .then(function(){
            scope.clearForm();
            $mdDialog.hide();
            scope.openToast();
          })
          .catch($log.error);
        }
      };

      getGuides();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, getGuides);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, clearGuides);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, clearGuides);

    }
  }
});
