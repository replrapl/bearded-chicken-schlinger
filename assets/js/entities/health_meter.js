var HealthMeter = function(game, x, y, params) {
  this.label = game.add.text(x, y, 'Health', {
    font: 'bold 15pt Indie Flower',
    fill: '#59cfa8'
  });

  this.meter = new ProgressBar(game, x + 75, y, params);
};

HealthMeter.prototype.fillTo = function(percentage) {
  this.meter.fillTo(percentage);
};
