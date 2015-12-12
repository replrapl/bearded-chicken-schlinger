var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	 game.load.spritesheet('chicky', 'assets/images/chicky.png', 80, 80);
   game.load.spritesheet('chicky', 'assets/images/amish.png', 80, 80);
}

function create() {
  var graphics = this.game.add.graphics(0, 500);

  var ground = new Ground(game, graphics);
  var chick = new Chicken(1, 0, 0, game);
  ground.render();

  var amish = new Amish(game, graphics);
  amish.render();
}

function update() {
}
