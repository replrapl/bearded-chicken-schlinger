var Amish = function(game, x, y) {
  this.game = game;

  this.player = game.add.sprite(80, 80, 'amish');

  this.player.position.x = x;
  this.player.position.y = y;
};

Amish.prototype.render = function() {
};
