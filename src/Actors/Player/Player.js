function Player()
{
  var WalkSpeed = 6;
  var Gravity = .05;
  var JumpSpeed = 10;
  this.TickActions = function(entity)
  {
    if(KeyboardState._pressed[KeyboardState.LEFT])
      entity.xMoveSpeed = -WalkSpeed;
    else if(KeyboardState._pressed[KeyboardState.RIGHT])
      entity.xMoveSpeed = WalkSpeed;
    else
      entity.xMoveSpeed = 0;

    if(entity.grounded && KeyboardState._pressed[KeyboardState.UP])
    {
      MoveEntity(entity, entity.xs[2],entity.ys[2] - .00001,0);
      entity.grounded = false;
      entity.yMoveSpeed = -JumpSpeed;
    }
  }
}
