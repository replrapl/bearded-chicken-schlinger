var WindupMeter = function(game, params) {
  /*this.label = game.add.text(params.x, params.y, 'Power', {
    font: 'bold 15pt Indie Flower',
    fill: '#59cfa8'
  });*/

  this.meter = new ProgressBar(game, params);
};

WindupMeter.prototype.fillTo = function(percentage) {
  this.meter.fillTo(percentage);
};
