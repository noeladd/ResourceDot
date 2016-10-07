app.directive('fab', function ($mdDialog) {
return {
    restrict: 'E',
    templateUrl: 'js/common/directives/fab/fab.html',
    scope: true,
    link: function(scope) {
      scope.types = [
        'article',
        'book',
        'blog',
        'podcast',
        'website'
      ];

      scope.showDialog = function() {
        $mdDialog.show({
          contentElement: '#resourceDialog',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          escapeToClose: true
        });
      };

      scope.clearForm = function(){
        scope.resource = {};
      }

    }
  }
});
