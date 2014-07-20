APG.diver.systems.OxygenSystem = CES.System.extend({
  init: function(depletionRate) {
    this.depletionRate = depletionRate;
  },
  update: function(dt) {
    var entities = this.world.getEntities('oxygen_level');
    var self = this;
    entities.forEach(function(entity) {
      var oxygenLevel = entity.getComponent('oxygen_level');
      oxygenLevel.current -= self.depletionRate;

      if (entity.hasComponent('body')) {
        var body = entity.getComponent('body');
        _.each(body.collidingEntities, function(colliding) {
          if (colliding.hasComponent('oxygen_source')) {
            var source = colliding.getComponent('oxygen_source');
            if (oxygenLevel.current < oxygenLevel.max) {
              oxygenLevel.current += source.transferRate;
            }
          }
        });
      }
    });
  }
});