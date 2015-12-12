Chicken = function(index, x, y, game){

    this.game = game;
    this.weight = 100;
    this.girth = 1;

    this.body = game.add.sprite(80, 80, 'chicky');
    this.bounding = game.add.sprite(1000, 1000);
    game.physics.enable(this.body, Phaser.Physics.ARCADE);

    // this.body.body.bounce.y = 0.2;
    this.body.body.setSize(80, 80, -40, -40);
    this.body.position.x = x;
    this.body.position.y = y;
}

Chicken.prototype.layEgg = function(){
	// this.weight -= 5
}

Chicken.prototype.poop = function(){
	// this.weight -= 20
}

Chicken.prototype.moveX = function(x){
	this.body.position.x += x;
}

Chicken.prototype.moveY = function(y){
	this.body.position.y += y;
}

Chicken.prototype.fatten = function(value){
  this.girth += value;
  this.body.scale.setTo(this.girth, this.girth)
}

Chicken.prototype.evade = function(foods){
  this.game.physics.arcade.overlap(foods, this.bounding, evade, null, this);
}

function evade(){
    console.log('move!!')
}
