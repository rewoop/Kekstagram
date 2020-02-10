'use strict';

(function () {
  var DEFAULT_PIN_VALUE = 0.2;
  var DEFAULT_EFFECT_PIN_POSITION = '20%';
  var DEFAULT_EFFECT_LEVEL_VALUE = 10;

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var pinValue = DEFAULT_PIN_VALUE;
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

        effectLevelValue.value = Math.round(pinValue * 100);
        effectLevelDepth.style.width = pinValue * 100 + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var filters = document.querySelectorAll('.effects__item');

  var resetSliderValue = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_PIN_POSITION;
    effectLevelDepth.style.width = DEFAULT_EFFECT_PIN_POSITION;
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL_VALUE;
  };

  var changeFilters = function () {
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('change', function () {
        resetSliderValue();
      });
    }
  };
  changeFilters();
})();
