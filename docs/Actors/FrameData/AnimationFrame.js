
function FrameData(b64Image,width,height)
{
  var FrameDataParent = this;
  this.sprite = new Image(width,height);
  this.CollisionBox = [];
  var image = new Image(width,height);
  image.onload=function()
  {
      var opacityThreashold = 0;
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0,width,height);
      var imageData = context.getImageData(0, 0, image.width, image.height);
      context.clearRect(0, 0, canvas.width, canvas.height);

      FrameDataParent.sprite = image;

      var relativeBodyPoints = [];


      for(var pixelOpacity = 3; pixelOpacity < imageData.data.length; pixelOpacity+=4)
      {
        if(imageData.data[pixelOpacity] > opacityThreashold)
        {
          var x = (pixelOpacity / 4) % imageData.width;
          relativeBodyPoints.push(new Point(x, Math.floor((pixelOpacity / 4) / imageData.width)));
        }
      }

      FrameDataParent.CollisionBox = QuickHull(relativeBodyPoints);
      console.log(imageData.data);
    };
  image.src = b64Image;


}
