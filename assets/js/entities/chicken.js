Chicken = function(index, x, y, game){

  this.game = game;
  this.girth = 1;
  this.direction = 1;
  
  this.bounding = game.add.sprite(2000, 2000, 'chicky');
  this.game.physics.enable(this.bounding, Phaser.Physics.ARCADE);
  // this.bounding.body.setSize(2000, 2000, 500, 16)

  this.body = game.add.sprite(100, 100, 'chicky');

  this.body.animations.add('flap');
  this.body.animations.play('flap', 10, true);

  this.game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;
  this.body.body.setSize(100, 100, 500, 16);
  this.body.anchor.setTo(0.5, 0.5);
  // this.velocityX = 0;
  this.velocityY = 0;
  this.stepSize = 0;
  this.going = true;

  this.pooStepSize = 1.5;
  this.eggStepSize = 0.5;

  this.collisionRadius = 50;
  this.avoidRadius = 100;

  this.loop = function(){
    // this.fatten(0.5)
    if(this.direction > 0){
      this.changeDirection(-1)
    } else {
      this.changeDirection(1)
    }
  }

  //  Our bullet group
  this.eggs = this.game.add.group();
  this.eggs.enableBody = true;
  this.eggs.physicsBodyType = Phaser.Physics.ARCADE;
  this.eggs.createMultiple(30, 'bullet');
  this.eggs.setAll('anchor.x', 0.5);
  this.eggs.setAll('anchor.y', 0.5);
  this.eggs.setAll('outOfBoundsKill', true);
  this.eggs.setAll('checkWorldBounds', true);
  // button
  this.eggButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // time window
  this.eggTime = 0;


  //  Our bullet group
  this.poos = this.game.add.group();
  this.poos.enableBody = true;
  this.poos.physicsBodyType = Phaser.Physics.ARCADE;
  this.poos.createMultiple(30, 'bullet');
  this.poos.setAll('anchor.x', 0.5);
  this.poos.setAll('anchor.y', 1);
  this.poos.setAll('outOfBoundsKill', true);
  this.poos.setAll('checkWorldBounds', true);
  // button
  this.pooButton = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
  // time window
  this.pooTime = 0;

  // Make larger
  this.fattenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
  // time window
  this.fatTime = 0;
}

Chicken.prototype.startWander = function(time){
  this.loop = setInterval(this.loop.bind(this), time)
}

Chicken.prototype.collided = function(food, distance){
  // Run collision
  var f_x = food.position.x,
    f_y = food.position.y,
    x = this.body.position.x,
    y = this.body.position.y;

  var d = Math.sqrt(Math.pow(y - f_y, 2) + Math.pow(x - f_x, 2))

  if(d < distance){
    var h, v;
    if((x - f_x) > 0){
      h = -1 // food on left
    } else {
      h = 1 // food on right
    }
    if ((y - f_y) > 0){
      v = 1 // food above
    } else {
      v = -1 // food below
    }
    return {x: h, y: v}
  }
  return
}

// lays an egg
Chicken.prototype.layEgg = function(){
  if(this.girth <= 1){
    return
  }

  // prevents too many egg layings in a short amount of time
  if (this.game.time.now > this.eggTime) {
    // move
    this.tweenHeight(-100, 1)
    // lose weight
    this.loseWeight()

    // handle eggs
    var egg = this.eggs.getFirstExists(false);
    if (egg) {
      egg.reset(this.body.position.x, this.body.position.y);
      egg.body.velocity.y = 400;
      this.eggTime = this.game.time.now + 500;
    }
  }
}
// drop a poo
Chicken.prototype.poo = function(){
  if(this.girth <= 1){
    return
  }

  // prevents too many poos from being dropped in a short amount of time
  if (this.game.time.now > this.pooTime) {

    // move
    this.tweenHeight(-200, 1)
    // lose weight
    for(var i = 0 ; i < 3 ; i++){
      this.loseWeight()
    }

    // handle poo
    var poo = this.poos.getFirstExists(false);
    if (poo) {
      poo.reset(this.body.position.x, this.body.position.y);
      poo.body.velocity.y = 400;
      this.pooTime = this.game.time.now + 500;
    }
  }
}

Chicken.prototype.avoidObstacle = function(){

}

// checks key presses and positions
Chicken.prototype.update = function(avoidMes /* array of things to avoid */, ground_level){

  if(!this.dead){
    
    this.calcSize()

    if(avoidMes){

      var coordinates = {};
      // avoids
      for(var i = 0 ; i < avoidMes.length ; i++){
        coordinates = this.collided(avoidMes[i], 500)
        if(coordinates){
          // console.log("AVOID!!!")
          this.avoidObstacle(coordinates.x, coordinates.y)
        }
      }

      // dies
      for(var i = 0 ; i < avoidMes.length ; i++){
        if(this.collided(avoidMes[i], 50)){
          // console.log("EAT!!!")
          this.fatten()
          avoidMes[i].kill()
        }
      }
    }

    if(Math.abs(this.stepSize) > 0){
      this.velocityY -= Math.sign(this.velocityY) * this.stepSize;
      this.body.position.y += Math.sign(this.velocityY) * this.stepSize;

      if(Math.abs(this.velocityY) < 0.25){
        this.velocityY = 0;
        this.stepSize = 0;
      }
    }

    if(this.body.position.y > ground_level){
      this.slaughter()
    }

    {
      chick.moveX(1)
      chick.moveY((Math.round(Math.random() - 1) + 0.5) * Math.floor((Math.random() * 2) + 1))
    }
    /*// eggs
    if (this.eggButton.isDown) {
      this.layEgg();
    }

    // poos
    if (this.pooButton.isDown) {
      this.poo();
    }

    // fats
    if (this.fattenButton.isDown) {
      this.fatten();
    }*/
  }
};

Chicken.prototype.slaughter = function(){
  console.log("DIE!!!")
  this.dead = true;
};

// start a vertical tween
Chicken.prototype.tweenHeight = function(y, stepSize){
  this.velocityY = y;
  this.stepSize = stepSize;
}

Chicken.prototype.moveX = function(x){
  this.body.position.x += x * this.direction;
}
Chicken.prototype.moveY = function(y){
  this.body.position.y += y;

}

// set the direction of flight
Chicken.prototype.changeDirection = function(dir){
  if(dir < 0 ){
    dir = -1
  } else {
    dir = 1
  }
  this.direction = dir
}

// fatten chicken
Chicken.prototype.fatten = function(){

  // in time window?
  if (this.game.time.now > this.fatTime) {

    // increment girths
    this.girth++;
    if(this.girth > 10){
      this.girth = 10
    } else if(this.girth < 1){
      this.girth = 1
    }

    // move
    this.tweenHeight(50, 1)
    // scale
    this.calcSize();
    this.fatTime = this.game.time.now + 2000;
  }
}
// lose some weight
Chicken.prototype.loseWeight = function(){

  // in time window?
  if (this.game.time.now > this.fatTime) {

    // increment girths
    this.girth--;
    if(this.girth > 10){
      this.girth = 10
    } else if(this.girth < 1){
      this.girth = 1
    }

    // scale
    this.calcSize();
    this.fatTime = this.game.time.now + 2000;
  }
}
// recalculate size of chicken
Chicken.prototype.calcSize = function(){
  this.collisionRadius = this.collisionRadius + this.girth * 50
  console.log(this.direction)
  this.body.scale.setTo(-this.direction * (1 + this.girth * 0.15), 1 + this.girth * 0.15)
}

Chicken.prototype.evade = function(foods){
  /* foods = [
    {bullet ...}
  ] */
  this.game.physics.arcade.overlap(foods, this.bounding, evade, null, this);
}

function evade(){
    // console.log('move!!')
}
