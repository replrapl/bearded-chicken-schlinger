//  The Google WebFont Loader will look for this object, so create it before loading the script.
/*WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: createText,

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Indie Flower']
    }

};*/
var game = new Phaser.Game('100', '100', Phaser.AUTO, '', { preload: preload, create: create, update: update });

  var GROUND_LEVEL;

  function preload() {
    //  Load the Google WebFont Loader script
    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.spritesheet('chicky', 'assets/images/Sprite-0001.png', 150, 150, 5);
    game.load.spritesheet('amish', 'assets/images/amish.png', 80, 80);
    game.load.spritesheet('grass', 'assets/images/grass.png', 100, 75);
  }

  function createText() {

  };

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

    if (cursors.left.isDown) {
      amish.player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown) {
      amish.player.body.velocity.x = 200;
    }
    amish.update(chick.eggs.children);

    // chick stuff
    chick.update(amish.foods.children, GROUND_LEVEL);
  }
