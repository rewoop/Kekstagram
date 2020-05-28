'use strict';

(function () {
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var pinValue = window.constants.DEFAULT_PIN_VALUE;
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinX = effectLevelPin.offsetLeft - shift.x;

      if (!(pinX < 0 || pinX > effectLevelLine.offsetWidth)) {
        effectLevelPin.style.left = (pinX) + 'px';

        pinValue = pinX / effectLevelLine.offsetWidth;
        window.form.getFilterValue(pinValue);
        effectLevelValue.value = Math.round(pinValue * window.constants.DEFAULT_FACTOR);
        effectLevelDepth.style.width = pinValue * window.constants.DEFAULT_FACTOR + '%';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
