APG.diver.systems.PhysicsSystem = CES.System.extend({
  init: function(friction, scalingFactor) {
    this.friction = friction;
    this.scalingFactor = scalingFactor;
    this.physicsWorld = boxbox.createWorld();
    this.physicsWorld.gravity({x: 0, y: 0});
  },
  addedToWorld: function(world) {
    world.entityAdded('position', 'body').add(_.bind(this.entityAdded,
        this));
    this._super(world);
  },
  entityAdded: function(entity) {
    var position = entity.getComponent('position'),
        body = entity.getComponent('body');
    var options = _.clone(body.options);
    if (options.width) {
      options.width /= this.scalingFactor;
    }
    if (options.height) {
      options.height /= this.scalingFactor;
    }
    if (options.radius) {
      options.radius /= this.scalingFactor;
    }
    body.physicsEntity = this.physicsWorld.createEntity(options, {
      x: position.x / this.scalingFactor,
      y: position.y / this.scalingFactor
    });

    if (!entity.hasComponent('rotation')) {
      entity.addComponent(new APG.diver.components.Rotation(0));
    } else {
      body.physicsEntity.rotation(entity.getComponent('rotation').theta);
    }
  },
  update: function(dt) {
    this.physicsWorld.tick(dt);
    var entities = this.world.getEntities('position', 'rotation', 'body');
    var self = this;
    entities.forEach(function(entity) {
      var body = entity.getComponent('body'),
          position = entity.getComponent('position'),
          rotation = entity.getComponent('rotation');
      position.x = body.physicsEntity.position().x * self.scalingFactor;
      position.y = body.physicsEntity.position().y * self.scalingFactor;
      rotation.theta = body.physicsEntity.rotation();
    });
  }
});