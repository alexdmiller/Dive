APG.diver.components = {};

APG.diver.components.Position = CES.Component.extend({
  name: 'position',
  init: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

APG.diver.components.Rotation = CES.Component.extend({
  name: 'rotation',
  init: function(theta) {
    this.theta = theta;
  }
});

APG.diver.components.Renderable = CES.Component.extend({
  name: 'renderable',
  init: function(color, cameraFocus, viewController) {
    this.color = color;
    this.cameraFocus = cameraFocus;
    this.viewController = viewController;
    this.sprite = null;
  }
});

APG.diver.components.Body = CES.Component.extend({
  name: 'body',
  init: function(options) {
    this.options = options;
    this.physicsEntity = null;
    this.collidingEntities = [];
  },
  applyImpulse: function(force, angle) {
    if (this.physicsEntity) {
      this.physicsEntity.applyImpulse(force, angle);
    }
  }
});

APG.diver.components.MouseAttraction = CES.Component.extend({
  name: 'mouse_attraction',
  init: function(attraction, maxForce) {
    this.attraction = attraction;
    this.maxForce = maxForce;
  }
});

APG.diver.components.OxygenLevel = CES.Component.extend({
  name: 'oxygen_level',
  init: function(current, max) {
    this.current = current;
    this.max = max;
  }
});

APG.diver.components.OxygenSource = CES.Component.extend({
  name: 'oxygen_source',
  init: function(transferRate) {
    this.transferRate = transferRate;
  }
})

APG.diver.components.UIComponent = CES.Component.extend({
  name: 'ui_component',
  init: function(viewController) {
    this.viewController = viewController;
  }
});

