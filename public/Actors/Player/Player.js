function Player()
{
  var WalkSpeed = 6;
  var Gravity = .05;
  var JumpSpeed = 10;
  var SlideTicksCount = 0;

  this.JumpHeld = 0;


                  //walk right - 0 stand
  this.Frames = [new FrameData('./Resources/Character/Ness/sprites/0.png',22,41),
                new FrameData('./Resources/Character/Ness/sprites/1.png',26,40),
                new FrameData('./Resources/Character/Ness/sprites/2.png',28,40),
                new FrameData('./Resources/Character/Ness/sprites/3.png',29,42),
                new FrameData('./Resources/Character/Ness/sprites/4.png',22,42),
                new FrameData('./Resources/Character/Ness/sprites/5.png',26,41),
                new FrameData('./Resources/Character/Ness/sprites/6.png',28,41),
                new FrameData('./Resources/Character/Ness/sprites/7.png',29,42),
                new FrameData('./Resources/Character/Ness/sprites/8.png',21,41),
                //walk left - 17 stand
                new FrameData('./Resources/Character/Ness/sprites/9.png',21,41),
                new FrameData('./Resources/Character/Ness/sprites/10.png',29,42),
                new FrameData('./Resources/Character/Ness/sprites/11.png',27,42),
                new FrameData('./Resources/Character/Ness/sprites/12.png',23,41),
                new FrameData('./Resources/Character/Ness/sprites/13.png',27,41),
                new FrameData('./Resources/Character/Ness/sprites/14.png',27,41),
                new FrameData('./Resources/Character/Ness/sprites/15.png',28,41),
                new FrameData('./Resources/Character/Ness/sprites/16.png',24,41),
                new FrameData('./Resources/Character/Ness/sprites/17.png',22,41),
                new FrameData('./Resources/Character/Ness/sprites/18.png',28,43),
                new FrameData('./Resources/Character/Ness/sprites/19.png',28,43)];
  this.FrameIndex = 0;
  this.WalkCycleCounter = 0;
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



    if(direction < 0 || KeyboardState._pressed[KeyboardState.LEFT])
    {
      ParentPlayer.WalkCycleCounter++;
      if(entity.grounded)
      {
        ParentPlayer.FrameIndex++;
        if(ParentPlayer.FrameIndex > 17)
          ParentPlayer.FrameIndex = 9;
      }
      else
      {
        ParentPlayer.FrameIndex = 18;
      }
    }
    else if(direction > 0 || KeyboardState._pressed[KeyboardState.Right])
    {
      ParentPlayer.WalkCycleCounter++;
      if(entity.grounded)
      {
        ParentPlayer.FrameIndex++;
        if(ParentPlayer.FrameIndex > 8)
          ParentPlayer.FrameIndex = 0;
      }
      else
      {
        ParentPlayer.FrameIndex = 19;
      }
    }
    else if(!entity.grounded)
    {
      if(ParentPlayer.FrameIndex < 18)
        if(ParentPlayer.FrameIndex < 9)
          ParentPlayer.FrameIndex = 19;
        else
          ParentPlayer.FrameIndex = 18;
    }
    else if(entity.grounded)
    {
        if(ParentPlayer.FrameIndex == 18)
          ParentPlayer.FrameIndex = 0;
        else if(ParentPlayer.FrameIndex == 19)
          ParentPlayer.FrameIndex = 9;
    }

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
       if(ParentPlayer.FrameIndex <= 8)
          ParentPlayer.FrameIndex = 8;
       else
          ParentPlayer.FrameIndex = 9;

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
      SlideTicksCount = 15;
    }

  }
}
