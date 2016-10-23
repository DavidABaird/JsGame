function Player()
{
  var WalkSpeed = 6;
  var Gravity = .05;
  var JumpSpeed = 10;
  var SlideTicksCount = 0;

  this.Frames = [new FrameData(TEST_SPRITE_A_LEFT,67,107),new FrameData(TEST_SPRITE_A_RIGHT,67,107)];
  this.FrameIndex = 0;

  var ParentPlayer = this;

  this.CollisionHandling = function(collisionPoints)
  {

    if(collisionPoints.length > 0)
      console.log("Hit something" + collisionPoints.length);
    else if(collisionPoints.length == 0)
      console.log("freeeeeee, free fallin!");
    else
      console.log("FUUUCK: " + JSON.stringify(collisionPoints));
  }

  this.TickActions = function(entity)
  {
    var velocity = new EntityVelocity(entity.xs,entity.ys,entity.intervals);
    var direction = EntityDirection(velocity.dx);

    if(direction < 0)
      ParentPlayer.FrameIndex = 0;
    else if(direction > 0)
      ParentPlayer.FrameIndex = 1;

    if(SlideTicksCount == 0)
    {
      if(KeyboardState._pressed[KeyboardState.LEFT] && entity.xMoveSpeed >= -WalkSpeed)
        entity.xMoveSpeed = -WalkSpeed;
      else if(KeyboardState._pressed[KeyboardState.RIGHT] <= WalkSpeed)
        entity.xMoveSpeed = WalkSpeed;
      else if(entity.grounded)
      {
          entity.xMoveSpeed = 0;
      }
    }
    else if(entity.grounded)
    {
       SlideTicksCount--;
       if(SlideTicksCount < 10)
        entity.xMoveSpeed-=direction * 1;
    }

    if(entity.grounded && KeyboardState._pressed[KeyboardState.UP])
    {
      MoveEntity(entity, entity.xs[2],entity.ys[2] - .00001,0);
      entity.grounded = false;
      entity.yMoveSpeed = -JumpSpeed;
      SlideTicksCount = 0;
    }

    if(!entity.grounded && KeyboardState._pressed[KeyboardState.DOWN])
    {
      entity.yMoveSpeed = 25;
      entity.xMoveSpeed = direction * 10;
      SlideTicksCount = 25;
    }
  }
}
