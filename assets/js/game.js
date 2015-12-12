var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var amish;
var cursors;
var eggTime = 0;

function preload() {

  game.load.spritesheet('chicky', 'assets/images/chicky.png', 80, 80);
  game.load.spritesheet('amish', 'assets/images/amish.png', 80, 80);
}

function create() {
  var graphics = this.game.add.graphics(0, 500);

  var ground = new Ground(game, graphics);
  ground.render();

  chick = new Chicken(1, 100, 200, game);
  chick.startWander(5000)
  // chick.tweenHeight(150, 1);

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

  chick.update(3);
  chick.moveX(1)
  chick.moveY((Math.round(Math.random() - 1) + 0.5) * Math.floor((Math.random() * 2) + 1))


  //  Firing?
  // if (fireButton.isDown)
  // {
  //     fireBullet();
  // }
}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > eggTime) {
        //  Grab the first egg we can from the pool
        egg = eggs.getFirstExists(false);

        if (egg) {
            //  And fire it
            egg.reset(chick.body.position.x, chick.body.position.y);
            egg.body.velocity.y = 400;
            eggTime = game.time.now + 500;
        }
    }

}
