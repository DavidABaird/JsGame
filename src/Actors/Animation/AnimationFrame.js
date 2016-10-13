function AnimationFrame(image)
{
  this.imgData = image;
}

function AnimationFrameData(image)
{
  var tmpCanvas = document.createElement('tmpCanvas');
  var context = tmpCanvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0 );
  var imgData = context.getImageData(0, 0, image.width, image.height);
  console.log(JSON.stringify(imgData.data));
  for(var pixel = 0; pixel < imgData.data.length; pixel+=4)
  {

  }
}
