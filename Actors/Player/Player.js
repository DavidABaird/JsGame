function Player()
{
  var WalkSpeed = 6;
  var Gravity = .05;
  var JumpSpeed = 10;
  var SlideTicksCount = 0;

  this.JumpHeld = 0;

  this.Frames = [new FrameData(TEST_SPRITE_A_LEFT,67,107),new FrameData(TEST_SPRITE_A_RIGHT,67,107)];
  this.FrameIndex = 0;

  var ParentPlayer = this;

  this.CollisionHandling = function(entity, collisionPoints, firstPass)
  {
    var touchedFloor = false;
    var touchedWall = false;
    var maxUpAdjustmentNeeded = 0;
    var maxSideAdjustmentNeeded = 0;
    for(var point in collisionPoints)
    {
      var thisPoint = collisionPoints[point];
      if(thisPoint.collisionType == CollisionTypes.floor)
      {
        touchedFloor = true;
        if(Math.abs(thisPoint.upAdjustment/2) > Math.abs(maxUpAdjustmentNeeded))
          maxUpAdjustmentNeeded = Math.abs(thisPoint.upAdjustment/2);
      }
      else if(thisPoint.collisionType == CollisionTypes.wall)
      {
        touchedWall = true;
        if(Math.abs(thisPoint.sideAdjustment/2) > Math.abs(maxSideAdjustmentNeeded))
          maxSideAdjustmentNeeded = thisPoint.sideAdjustment/2;
      }
    }

    if(touchedWall && firstPass)
    {
      entity.xMoveSpeed = 0;
      entity.xs[2] += maxSideAdjustmentNeeded;
      entity.xs[1] = entity.xs[2];
      entity.xs[0] = entity.xs[2];
    }

    if(touchedFloor && firstPass)
    {
      entity.grounded = true;
      if(entity.yMoveSpeed > 0);
      {
        entity.yMoveSpeed = 0;
      }
      if(maxUpAdjustmentNeeded >= 2)
      {
        entity.ys[2] -= maxUpAdjustmentNeeded;
      }
    }
    else
      entity.grounded = false;



  }

  this.TickActions = function(entity)
  {
    var ShortHopHold = 5;

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

    if(entity.grounded && KeyboardState._pressed[KeyboardState.UP] && !KeyboardState._pressed[KeyboardState.DOWN])
    {
      ParentPlayer.JumpHeld++;
      if(ParentPlayer.JumpHeld == ShortHopHold)
      {
        MoveEntity(entity, entity.xs[2],entity.ys[2] - 5,0);
        entity.grounded = false;
        entity.yMoveSpeed = -JumpSpeed;
        SlideTicksCount = 0;
      }
    }
    else if(entity.grounded && !KeyboardState._pressed[KeyboardState.UP])
    {

      if(ParentPlayer.JumpHeld > 0 && ParentPlayer.JumpHeld < ShortHopHold)
      {

        MoveEntity(entity, entity.xs[2],entity.ys[2] - 5,0);
        entity.grounded = false;
        entity.yMoveSpeed = -JumpSpeed/2;
        SlideTicksCount = 0;
      }
      ParentPlayer.JumpHeld = 0;
    }

    if(!entity.grounded && KeyboardState._pressed[KeyboardState.DOWN] && SlideTicksCount == 0)
    {
      entity.yMoveSpeed = 25;
      entity.xMoveSpeed = direction * 10;
      SlideTicksCount = 25;
    }

  }
}
