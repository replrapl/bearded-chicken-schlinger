var Ground = function(game, graphics) {
  this.game = game;
  this.graphics = graphics;
  this.graphics.beginFill(0xda7702);
  this.graphics.lineStyle(6, 0xda7702, 1);
  this.graphics.lineTo(this.game.scale.width, 0);
  this.graphics.endFill();
};
