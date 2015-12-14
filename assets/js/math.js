function boundingBoxCollision(x_1, y_1, x_2, y_2, threshold){

  var d = distanceBetween(x_1, y_1, x_2, y_2)

  if(d < threshold){
    var h, v;
    if((x_2 - x_1) > 0){
      h = -1 // missile on left
    } else {
      h = 1 // missile on right
    }
    if ((y_2 - y_1) > 0){
      v = 1 // missile above
    } else {
      v = -1 // missile below
    }
    return {x: h, y: v}
  }
  return
};

function distanceBetween(x_1, y_1, x_2, y_2){
  return Math.sqrt(Math.pow(y_2 - y_1, 2) + Math.pow(x_2 - x_1, 2));
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
