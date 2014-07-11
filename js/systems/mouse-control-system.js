APG.diver.systems.MouseControlSystem = CES.System.extend({
  init: function(renderSystem) {
    this.renderSystem = renderSystem;

    var self = this;
    this.renderSystem.stage.mousedown = function() {
      self.mouseDown = true;
    };
    this.renderSystem.stage.mouseup = function() {
      self.mouseDown = false;
    };

  },

  update: function(dt) {
    var stage = this.stage;
    var entities = this.world.getEntities('mouse_attraction', 'position',
      'body');
    var mouse = this.renderSystem.mousePosition;
    if (this.mouseDown) {
      entities.forEach(function (entity) {
        var position = entity.getComponent('position'),
            body = entity.getComponent('body'),
            mouseAttraction = entity.getComponent('mouse_attraction');

        var dx = mouse.x - position.x;
        var dy = mouse.y - position.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 2) {
          var angle = Math.atan2(dy, dx);
          var force = Math.min(mouseAttraction.maxForce,
              mouseAttraction.attraction * dist);
          body.applyImpulse(force, angle);
        }
      });
    }

  }
});