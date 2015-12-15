Chicken = function(index, x, y, game) {

  this.game = game;
  this.girth = 1;
  this.direction = 1;

  this.deadSprite = game.add.sprite(100, 100, 'cooked');
  this.deadSprite.visible = false;
  this.sprites = [
    game.add.sprite(100, 100, 'chicky_1'),
    game.add.sprite(100, 100, 'chicky_2'),
    game.add.sprite(100, 100, 'chicky_3'),
    game.add.sprite(100, 100, 'chicky_4')
  ];
  for(var i = 0 ; i < this.sprites.length ; i ++){
    this.sprites[i].visible = false
  }
  this.sprite_index = 0;
  this.initializeSprite(x, y, this.sprite_index);

  this.velocityY = 0;
  this.stepSize = 0;
  this.going = true;

  this.target;

  this.pooStepSize = 1.5;
  this.eggStepSize = 0.5;

  this.collisionRadius = 50;
  this.avoidRadius = 100;

  //  Our bullet group
  this.eggs = this.game.add.group();
  this.eggs.enableBody = true;
  this.eggs.physicsBodyType = Phaser.Physics.ARCADE;
  this.eggs.createMultiple(5, 'egg', 0, false);
  for(var i = 0 ; i < this.eggs.children.length ; i++){
    this.eggs.children[i].animations.add('egg_fall', [0,1,2,3], 30, true);
    this.eggs.children[i].animations.add('egg_break', [4,5,6], 10, false);
    this.eggs.children[i].animations.play('egg_fall');
    this.eggs.children[i].scale.setTo(0.2, 0.2)
  }

  this.eggs.setAll('anchor.x', 0.5);
  this.eggs.setAll('anchor.y', 1.5);
  this.eggs.setAll('outOfBoundsKill', true);
  this.eggs.setAll('checkWorldBounds', true);
  // button
  // this.eggButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // time window
  this.eggTime = 0;

  //  Our bullet group
  this.poos = this.game.add.group();
  this.poos.enableBody = true;
  this.poos.physicsBodyType = Phaser.Physics.ARCADE;
  this.poos.createMultiple(5, 'bullet');
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

  this.wandering = false;

  // Sounds
  this.hitSound = game.add.audio('hit');
}

Chicken.prototype.initializeSprite = function(x, y, index){

  if(this.body){
    this.body.visible = false
  }

  this.body = this.sprites[index];
  this.body.visible = true;
  this.body.animations.add('flap');
  this.body.animations.play('flap', (index + 1) * 10, true);

  this.game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;
  this.body.body.setSize(32, 32, 500, 16);
  this.body.anchor.setTo(0.5, 0.5);
}

Chicken.prototype.startWander = function() {
  this.wandering = true;
}

// lays an egg
Chicken.prototype.layEgg = function() {

  if (this.girth <= 1) {
    return
  }

  // prevents too many egg layings in a short amount of time
  if (this.game.time.now > this.eggTime) {

    var lost = this.loseWeight();
    // lose weight
    if(lost){
      // rise
      this.tweenHeight(-70, 1)
      // handle eggs
      var egg = this.eggs.getFirstExists(false);
      if (egg) {
        egg.reset(this.body.position.x, this.body.position.y);
        egg.body.velocity.y = 100;
        egg.animations.play('egg_fall');
        this.eggTime = this.game.time.now + 1500;
      }
    }
  }
}
  // drop a poo
Chicken.prototype.poo = function() {
  if (this.girth <= 1) {
    return
  }

  // prevents too many poos from being dropped in a short amount of time
  if (this.game.time.now > this.pooTime) {

    // move
    this.tweenHeight(-200, 1)
      // lose weight
    for (var i = 0; i < 3; i++) {
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

Chicken.prototype.avoidObstacle = function() {

}

// checks key presses and positions
Chicken.prototype.update = function(avoidMes /* array of things to avoid */ , ground_level) {
  // Track whether a hit has occurred this frame.
  var hit = false;

  if (!this.dead) {

    this.calcSize()

    if(!this.tweening){
      var r = getRandomArbitrary(1, 31);
      if(r > 10){
        this.layEgg();
      }
    }

    if (avoidMes) {

      // dies
      for (var i = 0; i < avoidMes.length; i++) {
        if(avoidMes[i].alive){
          if (boundingBoxCollision(
            avoidMes[i].x,
            avoidMes[i].y,
            this.body.position.x,
            this.body.position.y,
            50)) {
            if(!hit) {
              hit = true;
            }
            this.fatten();
            avoidMes[i].kill();
          }
        }
      }
    }

    if(hit && !this.hitSound.isPlaying) {
      this.hitSound.play();
    }

    if (Math.abs(this.stepSize) > 0) {
      this.velocityY -= Math.sign(this.velocityY) * this.stepSize;
      this.body.position.y += Math.sign(this.velocityY) * this.stepSize;

      if (Math.abs(this.velocityY) < 0.25) {
        this.tweening = false;
        this.velocityY = 0;
        this.stepSize = 0;
      }
    }

    if (this.body.position.y > ground_level) {
      this.slaughter(this.body.position.x, this.body.position.y - 80)
    }

    for(var i = 0 ; i < this.eggs.length ; i++){
      if(this.eggs.children[i].position.y > ground_level - 10){
        this.eggs.children[i].animations.play('egg_break')
      }
      if(this.eggs.children[i].position.y > ground_level + 20){
        this.eggs.children[i].body.velocity.y = 0;
        this.eggs.children[i].kill();
      }
    }

    if(this.wandering){
      this.moveX(1);
      if(this.body.position.x > this.game.scale.width * 0.8){
        this.changeDirection(-1);
      }
      if(this.body.position.x < this.game.scale.width * 0.2){
        this.changeDirection(1);
      }
      this.moveY((Math.round(Math.random() - 1) + 0.5) * Math.floor((Math.random() * 2) + 1))
    }
  }
};

Chicken.prototype.slaughter = function(x, y) {
  this.dead = true;
  if(this.body){
    this.body.visible = false
  }

  this.body = this.deadSprite;
  this.body.visible = true;
  this.body.animations.add('steam');
  this.body.animations.play('steam', 5, true);

  this.game.physics.enable(this.body, Phaser.Physics.ARCADE);
  this.body.position.x = x;
  this.body.position.y = y;
  this.body.body.setSize(32, 32, 500, 16);
  this.body.anchor.setTo(0.5, 0.5);
  this.body.scale.setTo(0.5, 0.5);
};

// start a vertical tween
Chicken.prototype.tweenHeight = function(y, stepSize) {
  this.tweening = true;
  this.velocityY = y;
  this.stepSize = stepSize;
}

Chicken.prototype.moveX = function(x) {
  this.body.position.x += x * this.direction;
}
Chicken.prototype.moveY = function(y) {
  this.body.position.y += y;

}

// set the direction of flight
Chicken.prototype.changeDirection = function(dir) {
  this.direction = (dir < 0) ? -1 : 1
}

// fatten chicken
Chicken.prototype.fatten = function() {

  // in time window?
  if (this.game.time.now > this.fatTime) {
    // increment girths
    this.girth =  ((this.girth + 1) > (this.sprites.length - 1)) ?
      (this.sprites.length - 1) : (this.girth + 1);
    this.sprite_index = ((this.sprite_index + 1) > (this.sprites.length - 1)) ?
      (this.sprites.length - 1) : (this.sprite_index + 1);
    this.initializeSprite(this.body.position.x, this.body.position.y, this.sprite_index);
    // move
    this.tweenHeight(70, 1)
      // scale
    this.calcSize();
    this.fatTime = this.game.time.now + 500;
  }
}

// lose some weight
Chicken.prototype.loseWeight = function() {
  // var inced = false;
  // in time window?
  // if (this.game.time.now > this.fatTime) {
    var inced = true;
    // if(this.girth < this.sprites.length - 1){
      // increment girths
      this.girth--;
      if(this.girth < 1){
        inced = false;
        this.girth = 1;
      }

      this.sprite_index = ((this.sprite_index - 1) < 0) ? 0 : (this.sprite_index - 1);
      this.initializeSprite(this.body.position.x, this.body.position.y, this.sprite_index);
    // }
    // scale
    this.calcSize();
    // this.fatTime = this.game.time.now + 750;
    return inced
  // }
  // return inced
}

// recalculate size of chicken
Chicken.prototype.calcSize = function() {
  this.collisionRadius = this.collisionRadius + this.girth * 50
  this.body.scale.setTo(-this.direction * (0.4 + this.girth * 0.1), 0.4 + this.girth * 0.1)
}

Chicken.prototype.evade = function(foods) {
  /* foods = [
    {bullet ...}
  ] */
  this.game.physics.arcade.overlap(foods, this.bounding, evade, null, this);
}

function evade() {
  // console.log('move!!')
}
