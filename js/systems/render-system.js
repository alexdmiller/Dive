APG.diver.systems.RenderSystem = CES.System.extend({
  init: function(width, height) {
    this.stage = new PIXI.Stage(0x000044);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);
  },

  addedToWorld: function(world) {
    world.entityAdded('position', 'renderable').add(_.bind(this.entityAdded, this));
    this._super(world);
  },

  update: function(dt) {
    var entities = this.world.getEntities('position', 'velocity');
    entities.forEach(function(entity) {
      var renderable = entity.getComponent('renderable'),
          position = entity.getComponent('position');
      renderable.sprite.x = position.x;
      renderable.sprite.y = position.y;
    });
    this.renderer.render(this.stage);
  },

  entityAdded: function(entity) {
    var position = entity.getComponent('position'),
        renderable = entity.getComponent('renderable'),
        sprite = null;

    if (entity.hasComponent('box')) {
      var box = entity.getComponent('box'),
      sprite = new PIXI.Graphics();
      sprite.lineStyle(1, 0xFFFFFF, 1);
      sprite.drawRect(-box.width / 2, -box.height / 2, box.width, box.height);
    }

    sprite.x = position.x;
    sprite.y = position.y;

    renderable.sprite = sprite;
    this.stage.addChild(sprite);
  }
});