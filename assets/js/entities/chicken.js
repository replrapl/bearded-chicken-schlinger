Chicken = function(index, x, y, game){

	var x = x;
    var y = y;

    this.game = game;
    this.weight = 100;
    this.girth = 1;

    this.player = game.add.sprite(80, 80, 'chicky');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    // this.player.body.bounce.y = 0.2;
    this.player.body.setSize(20, 32, 5, 16);
}

Chicken.prototype.layEgg = function(){
	// this.weight -= 5
}

Chicken.prototype.poop = function(){
	// this.weight -= 20
}

Chicken.prototype.moveX = function(x){
	// this.x += x;
}

Chicken.prototype.moveY = function(y){
	// this.y += y;
}