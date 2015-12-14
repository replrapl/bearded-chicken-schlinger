var Sky = function(game, x, y, params) {
  this.x = x;
  this.y = y;
  this.size = params.size;
  this.colors = params.colors;
  this.alpha = params.alpha;
  this.fillColor = params.fill.color;
  this.fillAlpha = params.fill.alpha;
  this.fill = params.fill;
  this.rows = [];

  for(var i = 0; this.rows.length * this.size < game.scale.height; i++) {
    var column = [];
    this.rows[i] = column;

    for(var j = 0; column.length * this.size < game.scale.width; j++) {
      var xOffset = 0;
      var yOffset = 0;

      if(j - 1  !== -1) {
        xOffset = j * this.size;
      }

      if(i - 1 !== -1) {
        yOffset = i * this.size;
      }

      // Draw initial box
      var box = game.add.graphics(0, 0);
      box.checkWorldBounds = false;
      box.position.setTo(xOffset, yOffset);
      box.beginFill(this.colors[getRandomArbitrary(0, 3)], this.fillAlpha);
      box.lineStyle(1, this.colors[getRandomArbitrary(0, 3)], this.alpha)
      box.drawRect(0, 0, this.size, this.size);
      box.endFill();
      column.push(box);
    }
  }
};
