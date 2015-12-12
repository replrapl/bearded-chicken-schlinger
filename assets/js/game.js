var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
}

function create() {
  var ground = new Ground(game);
  ground.render();
}

function update() {
}
