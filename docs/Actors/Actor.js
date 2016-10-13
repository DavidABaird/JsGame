function Actor(xInitial, yInitial, concreteActor)
{
  this.sprites;
  var walkSpeed = 14;
  var gravity = 0.05;

  this.spriteIndex;

  if('Sprites' in concreteActor)
    this.sprites = concreteActor.Sprites;
  else
  {
    var ryuSprite = new Image(67,107);
    ryuSprite.src = "http://www.sdtimes.com/images/0604.sdt-blog-video-game-heroes-ryu.png";
    this.sprites = [ryuSprite];
    this.spriteIndex = 0;
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
