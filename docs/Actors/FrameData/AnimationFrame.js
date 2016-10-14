
function FrameData(b64Image)
{
  var opacityThreashold = 0;
  var FrameDataParent = this;
  this.sprite;
  this.CollisionBox;
  var image = new Image();
  image.onload=function()
  {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);

      FrameDataParent.sprite = image;

      var relativeBodyPoints = [];
      var b = "";
      for(var pixelOpacity = 3; pixelOpacity < imageData.data.length; pixelOpacity+=4)
      {
        if(imageData.data[pixelOpacity] > opacityThreashold)
        {
          var x = (pixelOpacity / 4) % imageData.width;
          relativeBodyPoints.push(new Point(x, Math.floor(x)));
          b+=("(" + x + "," + Math.floor(x) + "),");
        }
      }

      var test = QuickHull(relativeBodyPoints);

      console.log(test);
      console.log(test.length);

      console.log(imageData.data.length/4);



      FrameDataParent.CollisionBox = [];


    };
  image.src = b64Image;


}
