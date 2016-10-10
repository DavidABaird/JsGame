window.addEventListener('keyup', function(event) { KeyboardState.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { KeyboardState.onKeydown(event); }, false);

var KeyboardState = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
