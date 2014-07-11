var world = new CES.World();

var physicsSystem = new APG.diver.systems.PhysicsSystem(2, 30),
    renderSystem = new APG.diver.systems.RenderSystem(800, 600),
    mouseControlSystem = new APG.diver.systems.MouseControlSystem(
        renderSystem),
    oxygenSystem = new APG.diver.systems.OxygenSystem(1);

world.addSystem(oxygenSystem);
world.addSystem(physicsSystem);
world.addSystem(renderSystem);
world.addSystem(mouseControlSystem);

var diver = new CES.Entity();
diver.addComponent(new APG.diver.components.Position(100, 100));
diver.addComponent(new APG.diver.components.Body({
  shape: 'square',
  width: 30,
  height: 30,
  fixedRotation: true
}));
diver.addComponent(new APG.diver.components.Renderable(0xFFFFFF, true));
diver.addComponent(new APG.diver.components.MouseAttraction(1, 1));
var diverOxygenLevel = new APG.diver.components.OxygenLevel(5000, 5000);
diver.addComponent(diverOxygenLevel);
world.addEntity(diver);


var fish = new CES.Entity();
fish.addComponent(new APG.diver.components.Position(300, 300));
fish.addComponent(new APG.diver.components.Body({
  shape: 'square',
  width: 100,
  height: 30
}));
fish.addComponent(new APG.diver.components.Renderable(0xFFFFFF));
world.addEntity(fish);


fish = new CES.Entity();
fish.addComponent(new APG.diver.components.Position(100, 300));
fish.addComponent(new APG.diver.components.Body({
  shape: 'square',
  width: 100,
  height: 30
}));
fish.addComponent(new APG.diver.components.Renderable(0xFFFFFF));
world.addEntity(fish);


var oxygenMeter = new CES.Entity();
oxygenMeter.addComponent(new APG.diver.components.UIComponent(
    new APG.diver.viewControllers.MeterViewController(diverOxygenLevel, 20, 100)));
world.addEntity(oxygenMeter);


requestAnimFrame(tick);
function tick() {
  requestAnimFrame(tick);
  world.update();
}