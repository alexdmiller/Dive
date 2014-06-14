var world = new CES.World();

var physicsSystem = new APG.diver.systems.PhysicsSystem(),
    renderSystem = new APG.diver.systems.RenderSystem(),
    mouseControlSystem = new APG.diver.systems.MouseControlSystem(
    renderSystem.stage);

world.addSystem(physicsSystem);
world.addSystem(renderSystem);
world.addSystem(mouseControlSystem);

var diver = new CES.Entity();
diver.addComponent(new APG.diver.components.Position(100, 100));
diver.addComponent(new APG.diver.components.Velocity(1, 0));
diver.addComponent(new APG.diver.components.Box(30, 30));
diver.addComponent(new APG.diver.components.Renderable(0xFFFFFF));
world.addEntity(diver);

requestAnimFrame(tick);
function tick() {
  requestAnimFrame(tick);
  world.update();
}