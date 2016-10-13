app.directive('tagChips', function (TagFactory, ResourceFactory, $log) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tag-chips/tag-chips.html',
        scope: {
          selectedTags: '=',
          match: '='
        },
        link: function(scope) {

          TagFactory.getAll()
          .then(function(tags){
            var allTags = tags;
            scope.allTags = allTags;

            scope.queryTags = function(search) {
              var firstPass = allTags.filter(function(tag){
                return tag.title.includes(search.toLowerCase());
              });

              return firstPass.filter(function(tag){
                for (var i = 0; i < scope.selectedTags.length; i++){
                  if (tag.title === search) return false;
                }
                return true;
              });
            };

            scope.transformChip = function(chip) {
              if (angular.isObject(chip)) {
                return chip;
              }
              else if (chip) {
                return { title: chip.toLowerCase(), type: 'new' };
              }
            }

            scope.$watchCollection('selectedTags', function() {
                scope.availableTags = scope.queryTags('');
            });
          })
          .catch($log.error);

        }
    };
  });
