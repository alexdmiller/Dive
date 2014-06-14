APG.diver.systems.PhysicsSystem = CES.System.extend({
  init: function(friction) {
    this.friction = friction;
  },
  update: function(dt) {
    var entities = this.world.getEntities('position', 'velocity');
    var friction = this.friction;
    entities.forEach(function(entity) {
      var position = entity.getComponent('position'),
          velocity = entity.getComponent('velocity');
      velocity.x *= friction;
      velocity.y *= friction;

      position.x += velocity.x;
      position.y += velocity.y;
    });
  }
});