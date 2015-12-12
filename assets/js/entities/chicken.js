Chicken = function(index, x, y, game){

  this.game = game;
  this.weight = 100;
  this.girth = 1;
  this.direction = 1;
  this.body = game.add.sprite(80, 80, 'chicky');
  this.bounding = game.add.sprite(1000, 1000);
  game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;
  this.body.body.setSize(80, 80, 5, 16);
  // this.velocityX = 0;
  this.velocityY = 0;
  this.stepSize = 0;
  this.going = true;
  this.loop = function(){
    this.fatten(0.5)
    if(this.direction > 0){
      this.changeDirection(-1)
    } else {
      this.changeDirection(1)
    }
  }
}

Chicken.prototype.startWander = function(time){
  this.loop = setInterval(this.loop.bind(this), time)
}
Chicken.prototype.layEgg = function(){
  // this.moveY(-1);
  this.tweenHeight(100, 1)
  this.weight -= 5
  if(this.weight < 100){
    this.weight = 100
  } else if(this.weight > 1000){
    this.weight = 1000
  }
}
Chicken.prototype.poop = function(){
  this.tweenHeight(300, 1)
  this.weight -= 15
  if(this.weight < 100){
    this.weight = 100
  } else if(this.weight > 1000){
    this.weight = 1000
  }
  this.moveY(3)
}


Chicken.prototype.updatePosition = function(){
  if(this.stepSize > 0){
    this.body.position.y += this.stepSize;
    this.velocityY -= this.stepSize;
    if(this.velocityY < 0.25){
      this.velocityY = 0;
      this.stepSize = 0;
    }
  }
}
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

Chicken.prototype.changeDirection = function(dir){
  if(dir < 0 ){
    dir = -1
  } else {
    dir = 1
  }
  this.direction = dir
}

Chicken.prototype.fatten = function(value){
  this.girth += value;
  if(this.girth > 4){
    this.girth = 10
  } else if(this.girth < 1){
    this.girth = 1
  }
  this.weight += value;
  this.moveY(30)
  this.body.scale.setTo(this.girth, this.girth)
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
