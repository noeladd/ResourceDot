app.factory('TagFactory', function ($http) {
    return {
        getTags: function() {
          return $http.get('/api/tags')
          .then(function(res) {
            return res.data;
          });
        }
    };

});
