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
  this.foods.setAll('anchor.y', 0);
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
  this.harmTime = 0;
};

Amish.prototype.harm = function(amount) {
  if(this.dead === false) {
    // prevents too many harms in a short amount of time
    if (this.game.time.now > this.harmTime) {
      this.health -= amount;
      this.healthText.text = this.health;

      if(this.health === 0) {
        this.dead = true;
      }

      this.harmTime = this.game.time.now + 2000;
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

Amish.prototype.collided = function(obstacle, distance){
  // Run collision
  var f_x = obstacle.position.x,
    f_y = obstacle.position.y,
    x = this.player.position.x,
    y = this.player.position.y;

  var d = Math.sqrt(Math.pow(y - f_y, 2) + Math.pow(x - f_x, 2))

  if(d < distance){
    var h, v;
    if((x - f_x) > 0){
      h = -1 // obstacle on left
    } else {
      h = 1 // obstacle on right
    }
    if ((y - f_y) > 0){
      v = 1 // obstacle above
    } else {
      v = -1 // obstacle below
    }
    return {x: h, y: v}
  }
  return
}

Amish.prototype.update = function(avoidMes) {

  if(avoidMes){
    // dies
    for(var i = 0 ; i < avoidMes.length ; i++){
      if(this.collided(avoidMes[i], 50)){
        this.harm(2);
        avoidMes[i].kill()
      }
    }
  }

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
    // console.log("WINDING UP:", this.windup)
  } else if(this.isWindingUp){
    // only fire when button is released
    this.isWindingUp = false;
    this.schling(this.windup);
    this.windup = 0;
    // console.log("DONE")
  }
};

Amish.prototype.schling = function(velocity){
  // prevents too many food layings in a short amount of time
  if (this.game.time.now > this.foodTime) {

    // handle eggs
    var food = this.foods.getFirstExists(false);
    if (food) {
      food.reset(this.player.body.position.x, this.player.body.position.y);
      
      distanceToTarget = pyth(
        this.player.position.x, 
        this.player.position.y,
        game.input.activePointer.position.x,
        game.input.activePointer.position.y
      );

      food.rotation = game.physics.arcade.moveToPointer(food, 1, game.input.activePointer, 
        (500/velocity)*(distanceToTarget));
      food.body.gravity.set(0, 280);
      this.foodTime = this.game.time.now + 250;
    }
  }
};

function pyth(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2))
}