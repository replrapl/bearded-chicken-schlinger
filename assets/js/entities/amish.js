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
  this.game.input.mouse.capture = true;

  // time window
  this.foodTime = 0;
  this.isFiring = false;
  this.windup = 0;
};

Amish.prototype.update = function() {

  if(this.isFiring){
    this.windup += 10;
    if(this.windup > 500){
      this.windup = 500
    }
  }

  // fats
  if (this.game.input.activePointer.leftButton.isDown) {
    this.isFiring = true;
    console.log("WINDING UP:", this.windup)
  } else if(this.isFiring){
    this.isFiring = false;
    this.schling(this.windup);
    this.windup = 0;
    console.log("DONE")
  }
};

Amish.prototype.schling = function(velocity){
  // prevents too many food layings in a short amount of time
  if (this.game.time.now > this.foodTime) {

    // handle eggs
    var food = this.foods.getFirstExists(false);
    if (food) {
      food.reset(this.player.body.position.x, this.player.body.position.y);
      velocity = 1000 - velocity;
      if(velocity < 500){
        velocity = 500
      }
      food.rotation = game.physics.arcade.moveToPointer(food, 1000, game.input.activePointer, velocity);
      food.body.gravity.set(0, 280);
      this.foodTime = this.game.time.now + 500;
    }
  }
};