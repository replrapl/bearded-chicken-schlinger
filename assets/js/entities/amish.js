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

  // time window
  this.foodTime = 0;
  this.isWindingUp = false;
  this.windup = 0;

  // Health pool
  this.dead = false;
  this.health = 100;
  this.harmButton = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
};

Amish.prototype.harm = function(amount) {
  if(this.dead === false) {
    this.health -= amount;
    this.healthText.text = this.health;

    if(this.health === 0) {
      this.dead = true;
    }
  }
};

Amish.prototype.drawHealthPool = function() {
  // Display Health Pool
  this.game.add.text(100, this.game.scale.height - 85, 'HEALTH', {
    font: 'bold 15pt Indie Flower',
    fill: '#59cfa8'
  });
  this.healthText = this.game.add.text(200, this.game.scale.height - 85, this.health, {
    font: 'normal 15pt Indie Flower',
    fill: '#59cfa8'
  });
};

Amish.prototype.update = function() {
  // Health pool testing
  if (this.harmButton.isDown) {
    this.harm(2);
  }

  if(this.isWindingUp){
    this.windup += 10;
    if(this.windup > 500){
      this.windup = 500
    }
  }

  // fats
  if (this.game.input.activePointer.leftButton.isDown) {
    this.isWindingUp = true;
    console.log("WINDING UP:", this.windup)
  } else if(this.isWindingUp){
    // only fire when button is released
    this.isWindingUp = false;
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
      this.foodTime = this.game.time.now + 250;
    }
  }
};
