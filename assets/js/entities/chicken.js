Chicken = function(index, x, y, game){

    this.game = game;
    this.weight = 100;
    this.girth = 1;

    this.player = game.add.sprite(80, 80, 'chicky');
    this.bounding = game.add.sprite(1000, 1000);
    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    // this.player.body.bounce.y = 0.2;
    this.player.body.setSize(80, 80, -40, -40);
    this.player.position.x = x;
    this.player.position.y = y;
}

Chicken.prototype.layEgg = function(){
	// this.weight -= 5
}

Chicken.prototype.poop = function(){
	// this.weight -= 20
}

Chicken.prototype.moveX = function(x){
	this.player.position.x += x;
}

Chicken.prototype.moveY = function(y){
	this.player.position.y += y;
}

Chicken.prototype.evade = function(foods){
    this.game.physics.arcade.overlap(foods, this.bounding, evade, null, this);
}

function evade(){
    console.log('move!!')
}
