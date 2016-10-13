var TickRate = 16;

var CurrentActors = [new Actor(10,10,new Player())];
var CurrentCollisionMap = GetTestMap();
var CollisionMapImageData = RenderCollisionMap(CurrentCollisionMap);


var image = new Image(67,107);
image.src = "http://www.sdtimes.com/images/0604.sdt-blog-video-game-heroes-ryu.png";

var canvasx = document.getElementById('tmpCanvas');
var contextx = tmpCanvas.getContext('2d');

canvasx.width = 2000;
canvasx.height = 2000;
canvasx.width = image.width;
canvasx.height = image.height;
contextx.drawImage(image, 0, 0 );
var imgData = contextx.getImageData(0, 0, image.width, image.height);
console.log(JSON.stringify(imgData.data));


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
