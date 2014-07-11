APG.diver.viewControllers.MeterViewController = function(level) {
  this.level = level;
  this.sprite = new PIXI.Graphics();
};

APG.diver.viewControllers.MeterViewController.prototype.getView = function() {
  return this.sprite;
}

APG.diver.viewControllers.MeterViewController.prototype.update = function() {
  this.sprite.clear();
  this.sprite.lineStyle(1, 0xFFFFFF, 1);
  this.sprite.drawRect(0, 0, 100, 30);
};
