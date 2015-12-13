var ProgressBar = function(game, x, y, params) {
  this.x = x;
  this.y = y;
  this.width = params.width;
  this.height = params.height;
  this.color = params.color;
  this.alpha = params.alpha;
  this.fillColor = params.fill.color;
  this.fillAlpha = params.fill.alpha;
  this.lineWidth = params.fill.width || 10;
  this.fill = params.fill;

  // Draw initial bar
  this.outerBar = game.add.graphics(0, 0);
  this.outerBar.position.setTo(this.x, this.y);
  this.outerBar.lineStyle(1, this.color, this.alpha)
  this.outerBar.drawRect(0, 0, this.width, this.height);

  // Draw inner bar
  this.innerBar = game.add.graphics(0, 0);
  this.innerBar.position.setTo(this.x + 1, this.y + 1);
  this.fillTo(1);
};

ProgressBar.prototype.drawInnerBar = function(percentage) {
  this.innerBar.clear();
  this.innerBar.beginFill(this.fillColor, this.fillAlpha);
  this.innerBar.drawRect(0, 0, (percentage === 0 ? percentage : this.width * percentage - 1), this.height - 1);
  this.innerBar.endFill();
};

// Fill the progress bar to the given percentage
ProgressBar.prototype.fillTo = function(fillTo) {
  this.drawInnerBar(fillTo);
};
