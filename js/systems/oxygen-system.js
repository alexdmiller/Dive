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
    });
  }
});