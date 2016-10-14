var TickRate = 16;

var CurrentActors = [new Actor(10,10,new Player())];
var CurrentCollisionMap = GetTestMap();
var CollisionMapImageData = RenderCollisionMap(CurrentCollisionMap);


FrameData("data:image/png;base64,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");



function draw()
{
  context = Display.getContext('2d');
  context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  context.putImageData(CollisionMapImageData,400,400);
  for(var actor in CurrentActors)
  {


    var entity = CurrentActors[actor].entity;
  	context.drawImage(entity.sprites[0],
      entity.xs[2],entity.ys[2],
      entity.sprites[0].width,entity.sprites[0].height);

    context.beginPath();
    context.arc(entity.xs[2],entity.ys[2],10,0,.25*Math.PI);
    context.stroke();
  }

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
