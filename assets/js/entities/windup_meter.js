var WindupMeter = function(game, params) {
  this.meter = new ProgressBar(game, params);
};

WindupMeter.prototype.fillTo = function(percentage) {
  this.meter.fillTo(percentage);
};
