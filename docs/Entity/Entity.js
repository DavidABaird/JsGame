function Entity(xInitial, yInitial, gravity, xMoveSpeed)
{
  this.xs = [xInitial,xInitial,xInitial];
  this.ys = [yInitial,yInitial,yInitial];
  this.intervals = [1,1,1];
  this.gravity= gravity;
  this.accruedGravity = 0;
  this.xMoveSpeed = 0;
  this.yMoveSpeed = 0;
  this.grounded = false;
}

function EntityTick(entity, interval)
{
  var xNext = entity.xs[2];
  var yNext = entity.ys[2];

  xNext+=entity.xMoveSpeed;

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

  //console.log("{" + entity.xs[2] + "," + entity.ys[2] + "}");
}

function EntityVelocity(xs,ys,intervals)
{
  this.dx = (xs[2] - xs[1])/intervals[2];
  this.dy = (ys[2] - ys[1])/intervals[2];
}

function EntityDirection(entityVelocityDx)
{
  if(entityVelocityDx < 0)
    return -1;
  else if(entityVelocityDx > 0)
    return 1;
  else
    return 0;
}
