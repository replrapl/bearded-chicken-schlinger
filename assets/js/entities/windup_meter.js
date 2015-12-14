var WindupMeter = function(game, x, y, params) {
  this.label = game.add.text(x, y, 'Power', {
    font: 'bold 15pt Indie Flower',
    fill: '#59cfa8'
  });

  this.meter = new ProgressBar(game, x + 75, y, params);
};

WindupMeter.prototype.fillTo = function(percentage) {
  this.meter.fillTo(percentage);
};
