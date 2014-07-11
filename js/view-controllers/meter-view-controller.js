APG.diver.viewControllers.MeterViewController = function(level, height, width) {
  this.level = level;
  this.height = height;
  this.width = width;
  this.sprite = new PIXI.Graphics();
};

APG.diver.viewControllers.MeterViewController.prototype.getView = function() {
  return this.sprite;
}

APG.diver.viewControllers.MeterViewController.prototype.update = function() {
  this.sprite.clear();

  this.sprite.beginFill(0xFFFFFF);
  this.sprite.drawRect(0, 0, this.level.current / this.level.max * this.width, this.height);
  this.sprite.endFill();
  this.sprite.lineStyle(1, 0xFFFFFF, 1);
  this.sprite.drawRect(0, 0, this.width, this.height);
};
