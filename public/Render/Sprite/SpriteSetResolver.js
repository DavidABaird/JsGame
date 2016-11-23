function ResolveSpriteSet(path)
{
  var context = canvas.getContext('2d');
  var image = new Image(500,500);
  image.setAttribute('crossOrigin', 'anonymous');
  var resolvedthis = this;
  image.onload=function()
  {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0,image.width,image.height);

      console.log(canvas.toDataURL());

    };
  image.src = path + '0.png';
}
