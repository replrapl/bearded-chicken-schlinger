var Ground = function(game, x, y, params) {
  this.x = x;
  this.y = y;
  this.size = params.size;
  this.colors = params.colors;
  this.alpha = params.alpha;
  this.fillColor = params.fill.color;
  this.fillAlpha = params.fill.alpha;
  this.fill = params.fill;
  this.columns = [];

  for(var i = 0; this.columns.length * this.size < game.scale.width; i++) {
    var xOffset = 0;

    if(i - 1  !== -1) {
      xOffset = i * this.size;
    }

    // Draw blade
    var bladeHeight = getRandomArbitrary(3, 40);
    var blade = game.add.graphics(0, 0);
    blade.checkWorldBounds = false;
    blade.position.setTo(xOffset, this.y - bladeHeight);
    blade.beginFill(this.colors[getRandomArbitrary(0, 3)], this.fillAlpha);
    blade.lineStyle(1, this.colors[getRandomArbitrary(0, 3)], this.alpha)
    blade.drawRect(0, 0, this.size, bladeHeight);
    blade.endFill();
    this.columns.push(blade);
  }
};
