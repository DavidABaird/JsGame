var TickRate = 16;

var CurrentActors = [new Actor(10,10,new Player())];
var CurrentCollisionMap = GetTestMap();
var CollisionMapImageData = RenderCollisionMap(CurrentCollisionMap);



//var points = [new Point(2,1),new Point(0,0),new Point(1,1), new Point(3,1), new Point(2,3), new Point(2,2)];

//console.log(QuickHull(points));

//var otherPoints = [new Point(12, 32),new Point(45, 98),new Point(65, 12),new Point(10, 30)];
//console.log(QuickHull(otherPoints));
function draw()
{
  context = Display.getContext('2d');
  context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  context.putImageData(CollisionMapImageData,400,400);
  for(var actor in CurrentActors)
  {


    var entity = CurrentActors[actor].entity;
  	context.drawImage(

      CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].sprite,
      entity.xs[2],
      entity.ys[2],
      CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].sprite.width,
      CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].sprite.height
    );

    if(DEBUG_MODE)
    {

      //draw hitbox data
      for(var point in CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].CollisionBox)
      {
        context.beginPath();
        context.arc(
                  CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].CollisionBox[point].x + entity.xs[2],
                  CurrentActors[actor].Frames[CurrentActors[actor].FrameIndex].CollisionBox[point].y + entity.ys[2],
                  2,
                  0,
                  2 * Math.PI,
                  true
        );

        context.fillStyle = DEBUG_COLOR;
        context.fill();
      }
    }


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
