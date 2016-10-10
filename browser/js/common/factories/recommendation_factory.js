app.factory('RecommendationFactory', function() {
  var RecommendationFactory = {};

  let intersect = function(a, b){
    let ai = 0, bi = 0;
    let result = [];

    while ( ai < a.length && bi < b.length ){
      if (a[ai] < b[bi] ){
         ai++;
        }
      else if (a[ai] > b[bi] ){
         bi++;
        }
      else { /* they're equal */
        result.push(a[ai]);
        ai++;
        bi++;
      }
    }
    return result;
  }
  let compare = function(a, b){
    if (a.rating < b.rating) return 1;
    if (a.rating > b.rating) return -1;
    return 0
  };

  function shuffle(array) {
    var copy = [], n = array.length, i;
    // While there remain elements to shuffle…
    while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);

      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    return copy;
  }

  RecommendationFactory.get = function(resources, currentUser) {
    let recommended = [];
    let shuffleGroup = [];
    
    resources.forEach(function(resource){
      //Formula for calculating how many friends like each resource.
      var currentRating = intersect(currentUser.friend, resource.likeUser).length - intersect(currentUser.friend, resource.dislikeUser).length;
      if (currentRating >= 0 && (resource.dislikeUser.indexOf(currentUser.id) === -1) && (resource.likeUser.indexOf(currentUser.id) === -1)){
        var obj = {resource: resource, rating: currentRating};
        if (currentRating === 0) shuffleGroup.push(obj);
        else recommended.push(obj);
      }
    })
    shuffleGroup = shuffle(shuffleGroup);
    recommended = recommended.concat(shuffleGroup);
    //Uses array.sort to sort the recommended resources numerically by rating
    return recommended.sort(compare);
  }
  return RecommendationFactory;
});
