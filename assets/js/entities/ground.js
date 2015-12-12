var Ground = function(game) {
  this.game = game;
};

Ground.prototype.render = function() {
  var ground = this.game.add.graphics(0, 500);
  ground.beginFill(0xda7702);
  ground.lineStyle(6, 0xda7702, 1);
  ground.lineTo(800, 0);
  ground.endFill();
};
