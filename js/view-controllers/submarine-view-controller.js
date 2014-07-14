APG.diver.viewControllers.SubmarineViewController = function() {
  this.texture = PIXI.Texture.fromImage('assets/sub_left.png');

  this.sprite = new PIXI.DisplayObjectContainer();

  var sub = new PIXI.Sprite(this.texture);
  sub.x = -sub.width / 2;
  sub.y = -50;

  this.sprite.addChild(sub)
};

APG.diver.viewControllers.SubmarineViewController.prototype.getView = function() {
  return this.sprite;
};
