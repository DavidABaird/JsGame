var CANVAS_HEIGHT = 700;
var CANVAS_WIDTH = 1245;

var CANVAS_INITIALIZED = false;

var canvas = document.createElement('canvas');
var tmpCanvas = document.createElement('tmpCanvas');
canvas.id = "Display";
tmpCanvas.id = "tmpCanvas";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
tmpCanvas.width = CANVAS_WIDTH;
tmpCanvas.height = CANVAS_HEIGHT;

document.getElementById('container').appendChild(canvas);
document.getElementById('container').appendChild(tmpCanvas);

CANVAS_INITIALIZED = true;
