function Actor(xInitial, yInitial, concreteActor)
{
  this.Frames;
  var walkSpeed = 14;
  var gravity = 0.05;

  this.frameIndex;

  if('Frames' in concreteActor)
    this.Frames = concreteActor.Frames;
  else
  {
    this.Frames = [new FrameData(TEST_SPRITE_B64,67,107)];
    this.frameIndex = 0;
  }

  if('WalkSpeed' in concreteActor)
    walkSpeed = concreteActor.WalkSpeed;
  if('Gravity' in concreteActor)
    gravity = concreteActor.WalkSpeed;

  this.ConcreteActor = concreteActor;

  this.entity = new Entity(xInitial,yInitial,gravity,walkSpeed,this.sprites);
}

function ActorTick(actor, interval)
{
  if("TickActions" in actor.ConcreteActor)
    actor.ConcreteActor.TickActions(actor.entity);
  if("ResolveSprite" in actor.ConcreteActor)
    actor.ConcreteActor.ResolveSpriteIndex();

  EntityTick(actor.entity, interval);
}
