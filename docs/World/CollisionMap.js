function CollisionPoint(x,y,collisionType, adjustment)
{
  this.x = x;
  this.y = y;
  this.collisionType = collisionType;
  this.adjustment = adjustment;
}

function CollisionMap(xSize,ySize){
  this.xSize = xSize;
  this.ySize = ySize;

  this.Nodes = new Array(xSize);

  for(var x = 0; x < xSize; x++)
  {
    this.Nodes[x] = new Array(ySize);
  }

  var ParentThis = this;
  this.GetCollidingPoints = function(collisionBox, x, y)
  {
    var collisions = [];
    for(var collisionPoint in collisionBox)
    {
      var thisPointX = Math.floor(collisionBox[collisionPoint].x + x);
      var thisPointY = Math.floor(collisionBox[collisionPoint].y + y);
      var collisionNode = ParentThis.Nodes[thisPointX][thisPointY];
      if(collisionNode == CollisionTypes.floor)
      {
        var adjustmentInitial = thisPointY;
        var adjustmentFinal = thisPointY - 1;
        while(ParentThis.Nodes[thisPointX][adjustmentFinal] == CollisionTypes.floor)
        {
          adjustmentFinal--;
        }
        collisions.push(
          new CollisionPoint(collisionBox[collisionPoint].x,
          collisionBox[collisionPoint].y,
          ParentThis.Nodes[thisPointX][thisPointY],
          Math.abs(adjustmentInitial - adjustmentFinal))
        );
      }
    }
    return collisions;
  }

}

function GetTestMap()
{
  var map = new CollisionMap(CANVAS_WIDTH,CANVAS_HEIGHT);
  var slope = 500;
  for(var x = 0; x < CANVAS_WIDTH; x++)
  {
    for(var y = 0; y < CANVAS_HEIGHT; y++)
    {
      if(y > slope)
        map.Nodes[x][y] = CollisionTypes.floor;
      else
        map.Nodes[x][y] = CollisionTypes.air;
    }
    if(x > 400 && x < 800)
      if(x % 2)
        slope-=.3;
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
      if(collisionMap.Nodes[x][y] == CollisionTypes.air)
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
      if(map.Nodes[x][y] == CollisionTypes.floor)
        console.log('X');
      else
        console.log('-')
    }
  }
}
