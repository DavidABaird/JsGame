function CollisionPoint(x,y,collisionType)
{
  this.x = x;
  this.y = y;
  this.collisionType = collisionType;
}

function CollisionMap(xSize,ySize){
  this.xSize = xSize;
  this.ySize = ySize;

  this.Nodes = new Array(xSize);

  for(var x = 0; x < xSize; x++)
  {
    this.Nodes[x] = new Array(ySize);
  }

  this.Nodes.fill(0);
  var ParentThis = this;
  this.GetCollidingPoints = function(collisionBox,x,y)
  {
    var collisions = [];
    for(var collisionPoint in collisionBox)
    {
      var thisPointX = collisionBox[collisionPoint].x + x;
      var thisPointY = collisionBox[collisionPoint].y + y;
      var collisionNode = ParentThis.Nodes[thisPointX,thisPointY];
      if(collisionNode != CollisionTypes.air)
        collisions.push(
          new CollisionPoint(collisionBox[collisionPoint].x,
          collisionBox[collisionPoint].y,
          ParentThis.Nodes[thisPointX,thisPointY])
        );
    }
    return collisions;
  }

}

function GetTestMap()
{
  var map = new CollisionMap(CANVAS_WIDTH,CANVAS_HEIGHT);
  for(var x = 0; x < 200; x++)
  {
    for(var y = 0; y < 200; y++)
    {
      map.Nodes[x,y] = CollisionTypes.floor;
    }
  }

  return map;
}

function BuildCollisionMapImageData(collisionMap)
{
  CollisionMapImageData = new ImageData(collisionMap.xSize,collisionMap.ySize);
  console.log(CollisionMapImageData.data.length);
  var imageDataIndex = 0;
  for(var y = 0; y < collisionMap.ySize; y++)
  {
    for(var x = 0; x < collisionMap.xSize; x++)
    {
      var pos = (y * CollisionMapImageData.width + x) * 4;
      if(collisionMap.Nodes[x,y] == CollisionTypes.air)
      {
        CollisionMapImageData.data[pos] = 255;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 1] = 255;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 2] = 255;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 3] = 0;
        imageDataIndex++;
      }
      else
      {
        CollisionMapImageData.data[pos] = 0;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 1] = 255;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 2] = 0;
        imageDataIndex++;
        CollisionMapImageData.data[pos + 3] = 255;
        imageDataIndex++;
      }
    }
  }
  console.log(collisionMap.Nodes);
  console.log(CollisionMapImageData.data);
  return CollisionMapImageData;
}


function LoopTest(map)
{
  for(var x in map.Nodes)
  {
    for(var y = 0; y < map.Nodes[x].length; y++)
    {
      if(map.Nodes[x,y] == CollisionTypes.floor)
        console.log('X');
      else
        console.log('-')
    }
  }
}
