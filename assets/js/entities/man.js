Man = function (game, x, y) {
	this.game = game;

	this.player = game.add.sprite(80, 80, 'man');
  this.player.scale.setTo(0.8, 0.8);
	this.player.anchor.setTo(0, 0.5);
  this.player.animations.add('walk', [0,1,2,3], 20, false);
  this.player.animations.add('schling', [4,5,6], 5, false);
	game.physics.enable(this.player, Phaser.Physics.ARCADE);

	// Sprite should collide with the world's bounds and bounce back into it.
	this.player.body.collideWorldBounds = true;

	// Positioning and movement
	this.player.position.x = x;
	this.player.position.y = y;
	this.velocity = 200;

	//  Our bullet group
	this.foods = this.game.add.group();
	this.foods.enableBody = true;
	this.foods.physicsBodyType = Phaser.Physics.ARCADE;
	this.foods.createMultiple(5, 'corn');

  for(var i = 0 ; i < this.foods.children.length; i++) {
    this.foods.children[i].animations.add('corn_schling');
    this.foods.children[i].animations.play('corn_schling', 25, true);
    this.foods.children[i].scale.setTo(0.2, 0.2)
  }

	this.foods.setAll('anchor.x', 0.5);
	this.foods.setAll('anchor.y', 0);
	this.foods.setAll('outOfBoundsKill', true);
	this.foods.setAll('checkWorldBounds', true);

	// time window
	this.foodTime = 0;
	this.isWindingUp = false;
	this.windup = 0;
  this.maxWindup = 250;

	// Health pool
	this.dead = false;
	this.health = 100;
	this.maxHealth = 100;
	this.harmButton = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
  this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.harmTime = 0;
	this.eggDamage = 12;

	// Sound Effects
	this.schlingSound = game.add.audio('schling');
};

Man.prototype.harm = function (amount) {
	if (this.dead === false) {
		if(this.health - amount <= 0) {
			this.health = 0;
			this.dead = true;
		} else {
			this.health -= amount;
		}
	}
};

// Move the player using a direction and velocity
Man.prototype.move = function (dir) {
	this.player.body.velocity.x = (dir == LEFT ? this.velocity * -1 : this.velocity);
};

Man.prototype.update = function (avoidMes) {

  this.player.body.velocity.setTo(0, 0);

	if (avoidMes) {
		// dies
		for (var i = 0; i < avoidMes.length; i++) {
      if(avoidMes[i].alive){
  			if (boundingBoxCollision(avoidMes[i].x, avoidMes[i].y, this.player.position.x, this.player.position.y, 75)) {
  				this.harm(this.eggDamage);
  				avoidMes[i].kill();
  				break;
  			}
      }
		}
	}

	// Health pool testing
	if (this.harmButton.isDown) {
		this.harm(2);
	}

	if (this.isWindingUp) {
		this.windup += 10;
		if (this.windup > this.maxWindup) {
			this.windup = this.maxWindup
		}
	}

  if(this.left.isDown){
    man.move(LEFT);
    this.player.animations.play('walk');
  } else if(this.right.isDown){
    man.move(RIGHT);
    this.player.animations.play('walk');
  }

	// fats
	if (this.game.input.activePointer.leftButton.isDown) {
		this.isWindingUp = true;
		// console.log("WINDING UP:", this.windup)
	} else if (this.isWindingUp) {
		// only fire when button is released
		this.isWindingUp = false;
		this.schling(this.windup);
		this.windup = 0;
		// console.log("DONE")
	}

	// Remove foods that hit the ground
	for(var i = 0 ; i < this.foods.children.length; i++) {
    if(this.foods.children[i].position.y > GROUND_LEVEL - 45) {
    	this.foods.children[i].kill();
    }
  }
};

Man.prototype.schling = function (velocity) {
	// prevents too many food layings in a short amount of time
	if (this.game.time.now > this.foodTime) {

		// handle eggs
		var food = this.foods.getFirstExists(false);
		if (food) {

      this.player.animations.play('schling');
			food.reset(this.player.body.position.x, this.player.body.position.y);

			// Play schling sound
			this.schlingSound.play();

			distanceToTarget = pyth(
				this.player.position.x,
				this.player.position.y,
				game.input.activePointer.position.x,
				game.input.activePointer.position.y
			);

			food.rotation = game.physics.arcade.moveToPointer(food, 1, game.input.activePointer, (this.maxWindup / velocity) * (distanceToTarget));
			food.body.gravity.set(0, 280);
			this.foodTime = this.game.time.now + 250;
		}
	}
};

Man.prototype.healthPercentage = function() {
  return this.health / this.maxHealth;
};

Man.prototype.windupPercentage = function() {
  return this.windup / this.maxWindup;
};

function pyth(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
