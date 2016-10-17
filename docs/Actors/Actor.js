function Actor(xInitial, yInitial, concreteActor)
{
  this.Frames;
  var walkSpeed = 14;
  var gravity = 0.05;

  this.FrameIndex = 0;

  if('Frames' in concreteActor)
  {
    this.Frames = concreteActor.Frames;
    this.FrameIndex = concreteActor.FrameIndex;
  }
  else
  {
    this.Frames = [new FrameData(TEST_SPRITE_A_RIGHT,67,107)];
    this.FrameIndex = 0;
  }

  if('WalkSpeed' in concreteActor)
    walkSpeed = concreteActor.WalkSpeed;
  if('Gravity' in concreteActor)
    gravity = concreteActor.WalkSpeed;

  this.ConcreteActor = concreteActor;

  this.entity = new Entity(xInitial,yInitial,gravity,walkSpeed);
}

function ActorTick(actor, interval)
{
  if("TickActions" in actor.ConcreteActor)
    actor.ConcreteActor.TickActions(actor.entity);
  if("ResolveSprite" in actor.ConcreteActor)
    actor.ConcreteActor.ResolveSpriteIndex();

  if("FrameIndex" in actor.ConcreteActor)
    actor.FrameIndex = actor.ConcreteActor.FrameIndex;



  EntityTick(actor.entity, interval);
}
