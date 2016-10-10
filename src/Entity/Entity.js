function Entity(xInitial, yInitial, gravity, xMoveSpeed, sprites)
{
  this.xs = [xInitial,xInitial,xInitial];
  this.ys = [yInitial,yInitial,yInitial];
  this.intervals = [1,1,1];
  this.gravity= gravity;
  this.accruedGravity = 0;
  this.xMoveSpeed = 0;
  this.yMoveSpeed = 0;
  this.sprites = sprites;
  this.grounded = false;
}

function EntityTick(entity, interval)
{
  var xNext = entity.xs[2];
  var yNext = entity.ys[2];

  xNext+=entity.xMoveSpeed;

  //replace with real collision detection
  if(yNext >= 500)
  {
    entity.grounded = true;
    yNext = 500;
  }

  if(entity.grounded == true)
  {
    entity.yMoveSpeed = 0;
    entity.accruedGravity = 0;
  }
  else
  {
    entity.accruedGravity+=entity.gravity;
  }

  entity.yMoveSpeed+= entity.accruedGravity;
  if(entity.yMoveSpeed >= TERMINAL_VELOCITY)
    entity.yMoveSpeed = TERMINAL_VELOCITY;
  yNext += entity.yMoveSpeed;

  MoveEntity(entity,xNext,yNext,interval);

}

function MoveEntity(entity, x, y, interval)
{
  entity.xs[0] = entity.xs[1];
  entity.xs[1] = entity.xs[2];
  entity.xs[2] = x;

  entity.ys[0] = entity.ys[1];
  entity.ys[1] = entity.ys[2];
  entity.ys[2] = y;

  entity.intervals[0] = entity.intervals[1];
  entity.intervals[1] = entity.intervals[2];
  entity.intervals[2] = interval;

}

function EntityVelocity(xs,ys,intervals)
{
  this.dx = (xs[2] - xs[1])/intervals[2];
  this.dy = (ys[2] - ys[1])/intervals[2];
}
