var Amish = function(game, x, y) {
  this.game = game;

  this.player = game.add.sprite(80, 80, 'amish');
  this.player.anchor.setTo(0, 0);
  game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.position.x = x;
  this.player.position.y = y;

  //  Our bullet group
  this.foods = this.game.add.group();
  this.foods.enableBody = true;
  this.foods.physicsBodyType = Phaser.Physics.ARCADE;
  this.foods.createMultiple(5, 'bullet');
  this.foods.setAll('anchor.x', 0.5);
  this.foods.setAll('anchor.y', 1);
  this.foods.setAll('outOfBoundsKill', true);
  this.foods.setAll('checkWorldBounds', true);

  // button
  this.foodButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  // time window
  this.foodTime = 0;
};

Amish.prototype.update = function() {

  // fats
  if (this.foodButton.isDown) {
    this.schling();
  }
};

Amish.prototype.schling = function(){
  // prevents too many food layings in a short amount of time
  if (this.game.time.now > this.foodTime) {

    // handle eggs
    var food = this.foods.getFirstExists(false);
    if (food) {
      food.reset(this.player.body.position.x, this.player.body.position.y);
      food.body.velocity.y = -200;
      food.body.velocity.x = 200;
      food.body.gravity.set(0, 180);
      this.foodTime = this.game.time.now + 500;
    }
  }
};