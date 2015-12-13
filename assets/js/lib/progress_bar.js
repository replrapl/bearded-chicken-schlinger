var ProgressBar = function(game, params) {
  this.x = params.x;
  this.y = params.y;
  this.width = params.width;
  this.height = params.height;
  this.color = params.color;
  this.alpha = params.alpha;
  this.fillColor = params.fill.color;
  this.fillAlpha = params.fill.alpha;
  this.lineWidth = params.fill.width || 10;
  this.fill = params.fill;

  // Draw initial bar
  this.outerBar = game.add.graphics(this.x, this.y);
  this.outerBar.lineStyle(1, this.color, this.alpha)
  this.outerBar.drawRect(this.x, this.y, this.width, this.height);
  this.outerBar.endFill();

  // Draw inner bar
  this.innerBar = game.add.graphics(this.x + 1, this.y + 1);
  this.fillTo(1);
};

ProgressBar.prototype.drawInnerBar = function(percent) {
  this.innerBar.clear();
  this.innerBar.beginFill(this.fillColor, this.fillAlpha);
  this.innerBar.drawRect(this.x, this.y, this.width * percent, this.height - 1);
  this.innerBar.endFill();
};

// Fill the progress bar to the given percentage
ProgressBar.prototype.fillTo = function(fillTo) {
  this.drawInnerBar(fillTo);
};
