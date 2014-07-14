APG.diver.systems.RenderSystem = CES.System.extend({
  init: function(width, height, debug) {
    this.stage = new PIXI.Stage(0x223366);
    this.width = width;
    this.height = height;
    this.debug = debug;
    this.mousePosition = { x: 0, y: 0 };
    this.renderer = PIXI.autoDetectRenderer(width, height);

    this.worldContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.worldContainer);

    this.guiContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.guiContainer);

    document.body.appendChild(this.renderer.view);
  },

  addedToWorld: function(world) {
    world.entityAdded('position', 'renderable').add(_.bind(this.worldEntityAdded,
        this));
    world.entityAdded('ui_component').add(_.bind(this.guiEntityAdded,
        this));
    this._super(world);
  },

  update: function(dt) {
    var entities = this.world.getEntities('position');
    var self = this;
    entities.forEach(function(entity) {
      var renderable = entity.getComponent('renderable'),
          position = entity.getComponent('position');
      renderable.sprite.x = position.x;
      renderable.sprite.y = position.y;

      if (entity.hasComponent('rotation')) {
        renderable.sprite.rotation = entity.getComponent('rotation').theta * Math.PI / 180;
      }

      if (renderable.cameraFocus) {
        self.positionCamera(renderable);
      }
    });

    this.mousePosition = this.stage.getMousePosition().clone();
    this.mousePosition.x -= this.worldContainer.x;
    this.mousePosition.y -= this.worldContainer.y;

    var uiComponents = this.world.getEntities('ui_component');
    uiComponents.forEach(function(entity) {
      var uiComponent = entity.getComponent('ui_component');
      uiComponent.viewController.update();
    });

    this.renderer.render(this.stage);
  },

  positionCamera: function(renderable) {
    this.worldContainer.x = -renderable.sprite.x + this.width / 2;
    this.worldContainer.y = -renderable.sprite.y + this.height / 2;
  },

  worldEntityAdded: function(entity) {
    var position = entity.getComponent('position'),
        renderable = entity.getComponent('renderable');

    if (entity.hasComponent('body') && entity.hasComponent('renderable')) {
      var body = entity.getComponent('body'),
          renderable = entity.getComponent('renderable');

      var spriteContainer = new PIXI.DisplayObjectContainer();

      if (renderable.viewController) {
        var sprite = renderable.viewController.getView();
        spriteContainer.addChild(sprite);
      } 

      if (body.options.shape == 'square') {
        sprite = new PIXI.Graphics();
        sprite.lineStyle(1, 0xFFFFFF, 1);
        sprite.drawRect(-body.options.width / 2,
                        -body.options.height / 2,
                        body.options.width,
                        body.options.height);
        spriteContainer.addChild(sprite);
      }
    }
    renderable.sprite = spriteContainer;
    this.worldContainer.addChild(spriteContainer);

    spriteContainer.x = position.x;
    spriteContainer.y = position.y;
  },

  guiEntityAdded: function(entity) {
    var uiComponent = entity.getComponent('ui_component');

    var sprite = uiComponent.viewController.getView();
    this.guiContainer.addChild(sprite);

    if (entity.hasComponent('position')) {
      var position = entity.getComponent('position');
      sprite.x = position.x;
      sprite.y = position.y;
    } else {
      sprite.x = 0;
      sprite.y = 0;
    }

    this.guiContainer.addChild(sprite);
  }
});