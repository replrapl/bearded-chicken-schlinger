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
  game.load.spritesheet('man', 'assets/images/man.png', 80, 80);
  game.load.spritesheet('grass', 'assets/images/grass.png', 100, 75);
}

function create() {

  // Initialize constants that rely on the game being initialized.
  GROUND_LEVEL = game.scale.height - 260;

  // Capture mouse events
  game.input.mouse.capture = true;

  console.log(game.scale.height);
  // Windup meter
  windupMeter = new WindupMeter(game, 270, game.scale.height - 85, {
    width: 100,
    height: 20,
    color: 0xb54167,
    alpha: 1,
    fill: {
      color: 0x73af53,
      alpha: 1
    }
  });

  // Ground
  var ground = new Ground(game);

  // Chicken
  chick = new Chicken(1, 100, 300, game);
  chick.startWander(20000)
    // chick.tweenHeight(150, 1);

  // Man
  man = new Man(game, 100, game.scale.height - 260);
  man.drawHealthPool();

  // Initialize cursor keys
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  man.player.body.velocity.setTo(0, 0);

  // Update windup meter
  windupMeter.fillTo(man.windupPercentage());

  // Probably want to make this a call to a move function
  if (cursors.left.isDown) {
    man.move(LEFT);
  } else if (cursors.right.isDown) {
    man.move(RIGHT);
  }
  man.update(chick.eggs.children);

  // chick stuff
  chick.update(man.foods.children, GROUND_LEVEL);
}
