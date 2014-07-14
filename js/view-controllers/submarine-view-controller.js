APG.diver.viewControllers.SubmarineViewController = function() {
  this.texture = PIXI.Texture.fromImage('assets/sub_left.png');
  this.sprite = new PIXI.Sprite(this.texture);
};

APG.diver.viewControllers.SubmarineViewController.prototype.getView = function() {
  return this.sprite;
};
