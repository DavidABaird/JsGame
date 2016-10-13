function CollisionMap(xSize,ySize){
  this.xSize = xSize;
  this.ySize = ySize;

  this.Air = 0;
  this.Solid = 1;
  this.Nodes = new Array(xSize);

  for(var x = 0; x < xSize; x++)
  {
    this.Nodes[x] = new Array(ySize);
  }

  this.Nodes.fill(0);
}

function GetTestMap()
{
  var map = new CollisionMap(500,500);
  for(var x = 0; x < 200; x++)
  {
    for(var y = 0; y < 200; y++)
    {
      map.Nodes[x,y] = map.Solid;
    }
  }

  return map;
}
