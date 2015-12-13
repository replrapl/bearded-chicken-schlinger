//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: createText,

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Indie Flower']
    }

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var amish;
var cursors;

function preload() {
  //  Load the Google WebFont Loader script
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  game.load.spritesheet('chicky', 'assets/images/chicky.png', 80, 80);
  game.load.spritesheet('amish', 'assets/images/amish.png', 80, 80);
}

function createText() {
  amish.drawHealthPool();
};

function create() {

  // game.physics.startSystem(Phaser.Physics.ARCADE);

  // Capture mouse events
  this.game.input.mouse.capture = true;

  var graphics = this.game.add.graphics(0, 500);

  // Ground
  var ground = new Ground(game, graphics);

  // Chicken
  chick = new Chicken(1, 100, 300, game);
  chick.startWander(5000)
  // chick.tweenHeight(150, 1);

  // Amish
  amish = new Amish(game, 100, 420);

  // Initialize cursor keys
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  amish.player.body.velocity.setTo(0, 0);

  if (cursors.left.isDown) {
    amish.player.body.velocity.x = -200;
  }
  else if (cursors.right.isDown) {
    amish.player.body.velocity.x = 200;
  }
  amish.update(chick.eggs.children);

  // chick stuff
  chick.update(amish.foods.children);
  // chick.collided(amish.foods.children, 200)
  chick.moveX(1)
  chick.moveY((Math.round(Math.random() - 1) + 0.5) * Math.floor((Math.random() * 2) + 1))
}
