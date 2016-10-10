function Actor(xInitial, yInitial, concreteActor)
{
  var sprites;
  var walkSpeed = 14;
  var gravity = 0.05;

  if('Sprites' in concreteActor)
    sprites = concreteActor.Sprites;
  else
  {
    var ryuSprite = new Image(67,107);
    ryuSprite.src = "http://www.sdtimes.com/images/0604.sdt-blog-video-game-heroes-ryu.png";
    sprites = [ryuSprite];
  }

  if('WalkSpeed' in concreteActor)
    walkSpeed = concreteActor.WalkSpeed;
  if('Gravity' in concreteActor)
    gravity = concreteActor.WalkSpeed;

  this.ConcreteActor = concreteActor;

  this.entity = new Entity(xInitial,yInitial,gravity,walkSpeed,sprites);
}

function ActorTick(actor, interval)
{
  if("TickActions" in actor.ConcreteActor)
    actor.ConcreteActor.TickActions(actor.entity);
  EntityTick(actor.entity, interval);
}
