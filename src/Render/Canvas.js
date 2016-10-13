var CANVAS_HEIGHT = 700;
var CANVAS_WIDTH = 1245;

var CANVAS_INITIALIZED = false;

var canvas = document.createElement('canvas');
canvas.id = "Display";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

document.getElementById('container').appendChild(canvas);

CANVAS_INITIALIZED = true;
