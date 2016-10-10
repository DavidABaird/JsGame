var TickRate = 16;

var CurrentActors = [new Actor(10,10,new Player())];


function draw()
{
  context = Display.getContext('2d');
  context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  context.beginPath();
  for(var actor in CurrentActors)
  {
    var entity = CurrentActors[actor].entity;
  	context.drawImage(entity.sprites[0],
      entity.xs[2],entity.ys[2],
      entity.sprites[0].width,entity.sprites[0].height);
  }
  context.closePath();
  context.fill();
}


function tick ()
{
  for(var actor in CurrentActors)
  {
    ActorTick(CurrentActors[actor], TickRate);
  }
  draw();
}
setInterval(tick,TickRate);
