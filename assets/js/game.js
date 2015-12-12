var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
}

function create() {
  var graphics = this.game.add.graphics(0, 500);

  var ground = new Ground(game, graphics);
  ground.render();

  var amish = new Amish(game, graphics);
  amish.render();
}

function update() {
}
