Chicken = function(index, x, y, game){

  this.game = game;
  this.girth = 1;
  this.direction = 1;
  this.body = game.add.sprite(80, 80, 'chicky');
  this.bounding = game.add.sprite(1000, 1000);
  game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;
  this.body.body.setSize(80, 80, 500, 16);
  this.body.anchor.setTo(0.5, 1);
  // this.velocityX = 0;
  this.velocityY = 0;
  this.stepSize = 0;
  this.going = true;

  this.pooStepSize = 1.5;
  this.eggStepSize = 0.5;

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
  this.eggs.setAll('anchor.y', 1);
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

  // button
  this.fattenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
  // time window
  this.fatTime = 0;
}

Chicken.prototype.startWander = function(time){
  this.loop = setInterval(this.loop.bind(this), time)
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
      egg.reset(chick.body.position.x, chick.body.position.y);
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
      poo.reset(chick.body.position.x, chick.body.position.y);
      poo.body.velocity.y = 400;
      this.pooTime = this.game.time.now + 500;
    }
  }
}

// checks key presses and positions
Chicken.prototype.update = function(){

  if(Math.abs(this.stepSize) > 0){
    this.velocityY -= Math.sign(this.velocityY) * this.stepSize;
    this.body.position.y += Math.sign(this.velocityY) * this.stepSize;

    if(Math.abs(this.velocityY) < 0.25){
      this.velocityY = 0;
      this.stepSize = 0;
    }
  }

  // eggs
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
  }
}
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
    this.tweenHeight(100, 1)
    // scale
    this.calcSize();
    this.fatTime = this.game.time.now + 500;
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
    this.fatTime = this.game.time.now + 500;
  }
}
// recalculate size of chicken
Chicken.prototype.calcSize = function(){
  this.body.scale.setTo(1 + this.girth * 0.2, 1 + this.girth * 0.2)
}

Chicken.prototype.evade = function(foods){
  /* foods = [
    {bullet ...}
  ] */
  this.game.physics.arcade.overlap(foods, this.bounding, evade, null, this);
}

function evade(){
    console.log('move!!')
}
