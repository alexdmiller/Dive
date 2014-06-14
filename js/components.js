APG.diver.components = {};

APG.diver.components.Position = CES.Component.extend({
  name: 'position',
  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

APG.diver.components.Velocity = CES.Component.extend({
  name: 'velocity',
  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

APG.diver.components.Renderable = CES.Component.extend({
  name: 'renderable',
  init: function(color) {
    this.color = color;
    this.sprite = null;
  }
});

APG.diver.components.Box = CES.Component.extend({
  name: 'box',
  init: function(width, height) {
    this.width = width;
    this.height = height;
  }
});

APG.diver.components.MouseAttraction = CES.Component.extend({
  name: 'mouse attraction',
  init: function(attraction, maxForce) {
    this.attraction = attraction;
    this.maxForce = maxForce;
  }
});