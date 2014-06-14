APG.diver.systems.MouseControlSystem = CES.System.extend({
  init: function(stage) {
    this.stage = stage;
    console.log(stage);
  },

  update: function(dt) {
    var entities = this.world.getEntities('mouse attraction', 'velocity');
    entities.forEach(function (entity) {
      var velocity = entity.getComponent('velocity');
      velocity.x++;
    });
  }
});