APG.diver.systems.PhysicsSystem = CES.System.extend({
  update: function(dt) {
    var entities = this.world.getEntities('position', 'velocity');
    entities.forEach(function(entity) {
      var position = entity.getComponent('position'),
          velocity = entity.getComponent('velocity');
      position.x += velocity.x;
      position.y += velocity.y;
    });
  }
});