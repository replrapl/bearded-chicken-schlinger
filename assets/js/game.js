var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var GROUND_LEVEL;
var LEFT = 'left';
var RIGHT = 'right';

function preload() {
  game.load.spritesheet('chicky', 'assets/images/Sprite-0001.png', 150, 150, 5);
  game.load.spritesheet('amish', 'assets/images/amish.png', 80, 80);
  game.load.spritesheet('grass', 'assets/images/grass.png', 100, 75);
}

function create() {

  // Initialize constants that rely on the game being initialized.
  GROUND_LEVEL = game.scale.height - 260;

  // Capture mouse events
  game.input.mouse.capture = true;

  var graphics = this.game.add.graphics(0, GROUND_LEVEL);

  // Ground
  var ground = new Ground(game, graphics);

  // Chicken
  chick = new Chicken(1, 100, 300, game);
  chick.startWander(20000)
    // chick.tweenHeight(150, 1);

  // Amish
  amish = new Amish(game, 100, game.scale.height - 260);
  amish.drawHealthPool();

  // Initialize cursor keys
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  amish.player.body.velocity.setTo(0, 0);

  // Probably want to make this a call to a move function

  if (cursors.left.isDown) {
    amish.move(LEFT);
  } else if (cursors.right.isDown) {
    amish.move(RIGHT);
  }
  amish.update(chick.eggs.children);

  // chick stuff
  chick.update(amish.foods.children, GROUND_LEVEL);
}
