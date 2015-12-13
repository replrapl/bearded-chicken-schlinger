var Ground = function(game, graphics) {
  this.game = game;
  this.graphics = graphics;

  this.sprite = game.add.tileSprite(0, this.game.scale.height - 200, this.game.scale.width, 75, 'grass');
};
