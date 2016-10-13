function RenderCollisionMap(collisionMap)
{
  var imageDataArray = new Uint8ClampedArray(4*collisionMap.xSize*collisionMap.ySize);
  var i = 0;
  for(var x = 0; x < collisionMap.xSize; x++)
  {
    for(var y = 0; y < collisionMap.ySize; y++)
    {
      if(collisionMap.Nodes[x,y] == collisionMap.Solid)
      {
        imageDataArray[i] = (255);
        imageDataArray[i] = (255);
        imageDataArray[i] = (255);
        imageDataArray[i] = (1);
      }
      i++;
    }
  }
  return new ImageData(imageDataArray,collisionMap.xSize,collisionMap.ySize)
}
