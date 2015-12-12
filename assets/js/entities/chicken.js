Chicken = function(index, x, y, game){

  this.game = game;
  this.weight = 100;
  this.direction = 1;
  this.girth = 1;
  this.body = game.add.sprite(80, 80, 'chicky');
  this.bounding = game.add.sprite(1000, 1000);
  game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;

  // this.body.body.bounce.y = 0.2;
  this.body.body.setSize(80, 80, 5, 16);


  this.loop = function(){
    if(this.direction > 0){
      this.changeDirection(-1)
    } else {
      this.changeDirection(1)
    }
  }
  this.going = true;
}

Chicken.prototype.start = function(){
  this.loop = setInterval(this.loop.bind(this), 5000)
}

Chicken.prototype.layEgg = function(){
  // this.weight -= 5
}

Chicken.prototype.poop = function(){
  // this.weight -= 20
}

Chicken.prototype.moveX = function(x){
  this.body.position.x += x * this.direction;
}

Chicken.prototype.moveY = function(y){
  this.body.position.y += y * this.direction;
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
  this.weight += value;
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
