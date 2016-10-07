app.directive('tagChips', function (TagFactory, ResourceFactory, $log) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tag-chips/tag-chips.html',
        scope: {
          selectedTags: '='
        },
        link: function(scope) {
          TagFactory.getAll()
          .then(function(tags){
            var allTags = tags;

            scope.allTags = allTags;

            scope.queryTags = function(search) {
              var firstPass = allTags.filter(function(tag){
                return tag.title.includes(search);
              });
              return firstPass.filter(function(tag){
                for(var i = 0; i < scope.selectedTags.length; i++){
                  if (tag.title === search) return false;
                }
                return true;
              });
            };

            scope.addTag = function(group) {
                scope.selectedTags.push(group);
            };

            scope.$watchCollection('selectedTags', function() {
                scope.availableTags = scope.queryTags('');
            });
          })
          .catch($log.error);

          scope.search = function() {
            var tags = scope.selectedTags.map(function(tag) {
              return tag.id;
            });
          };
        }
    };
  });
