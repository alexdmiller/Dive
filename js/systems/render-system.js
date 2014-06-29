APG.diver.systems.RenderSystem = CES.System.extend({
  init: function(width, height) {
    this.stage = new PIXI.Stage(0x223366);
    this.width = width;
    this.height = height;
    this.mousePosition = { x: 0, y: 0 };
    this.renderer = PIXI.autoDetectRenderer(800, 600);

    this.entityContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.entityContainer);

    document.body.appendChild(this.renderer.view);
  },

  addedToWorld: function(world) {
    world.entityAdded('position', 'renderable').add(_.bind(this.entityAdded,
        this));
    this._super(world);
  },

  update: function(dt) {
    var entities = this.world.getEntities('position', 'velocity');
    var self = this;
    entities.forEach(function(entity) {
      var renderable = entity.getComponent('renderable'),
          position = entity.getComponent('position');
      renderable.sprite.x = position.x;
      renderable.sprite.y = position.y;

      if (renderable.cameraFocus) {
        self.positionCamera(renderable);
      }
    });

    this.mousePosition = this.stage.getMousePosition().clone();
    this.mousePosition.x -= this.entityContainer.x;
    this.mousePosition.y -= this.entityContainer.y;

    this.renderer.render(this.stage);
  },

  positionCamera: function(renderable) {
    this.entityContainer.x = -renderable.sprite.x + this.width / 2;
    this.entityContainer.y = -renderable.sprite.y + this.height / 2;
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
    this.entityContainer.addChild(sprite);
  }
});