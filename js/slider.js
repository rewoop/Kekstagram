'use strict';

(function () {
  var DEFAULT_PIN_VALUE = 0.2;
  var DEFAULT_FACTOR = 100;
  var BLUR_MIN_VALUE = 0;
  var BLUR_MAX_VALUE = 3;
  var BRIGHTNESS_MIN_VALUE = 1;
  var BRIGHTNESS_MAX_VALUE = 3;

  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var filters = document.querySelectorAll('.effects__item');
  var radioFilters = document.querySelectorAll('.effects__radio');
  var pictureDiv = document.querySelector('.img-upload__preview');
  var picture = pictureDiv.querySelector('img');

  var pinValue = DEFAULT_PIN_VALUE;
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
        getFilterValue(pinValue);
        effectLevelValue.value = Math.round(pinValue * DEFAULT_FACTOR);
        effectLevelDepth.style.width = pinValue * DEFAULT_FACTOR + '%';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetSliderValue = function () {
    effectLevelPin.style = '';
    effectLevelDepth.style.width = '';
    effectLevelValue.value = '';
  };

  var removeFilters = function () {
    picture.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    picture.style.filter = '';
  };

  var changeFilters = function () {
    effectLevel.classList.add('hidden');
    filters.forEach(function (item) {
      item.addEventListener('change', function () {
        resetSliderValue();
        if (radioFilters[0].checked) {
          effectLevel.classList.add('hidden');
          removeFilters();
        } else if (radioFilters[1].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          picture.classList.add('effects__preview--chrome');
          picture.style.filter = 'grayscale(' + DEFAULT_PIN_VALUE + ')';
        } else if (radioFilters[2].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          picture.classList.add('effects__preview--sepia');
          picture.style.filter = 'sepia(' + DEFAULT_PIN_VALUE + ')';
        } else if (radioFilters[3].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          picture.classList.add('effects__preview--marvin');
          picture.style.filter = 'invert(' + (DEFAULT_PIN_VALUE * DEFAULT_FACTOR) + '%)';
        } else if (radioFilters[4].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          picture.classList.add('effects__preview--phobos');
          picture.style.filter = 'blur(' + getPinValueRange(DEFAULT_PIN_VALUE, BLUR_MIN_VALUE, BLUR_MAX_VALUE) + 'px)';
        } else if (radioFilters[5].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          picture.classList.add('effects__preview--heat');
          picture.style.filter = 'brightness(' + getPinValueRange(DEFAULT_PIN_VALUE, BRIGHTNESS_MIN_VALUE, BRIGHTNESS_MAX_VALUE) + ')';
        }
      });
    });
  };

  var getPinValueRange = function (pinValueNumber, minAmount, maxAmount) {
    return pinValueNumber * (maxAmount - minAmount) + minAmount;
  };

  var getFilterValue = function (currentPinValue) {
    if (radioFilters[0].checked) {
      removeFilters();
    } else if (radioFilters[1].checked) {
      picture.style.filter = 'grayscale(' + currentPinValue + ')';
    } else if (radioFilters[2].checked) {
      picture.style.filter = 'sepia(' + currentPinValue + ')';
    } else if (radioFilters[3].checked) {
      picture.style.filter = 'invert(' + (currentPinValue * DEFAULT_FACTOR) + '%)';
    } else if (radioFilters[4].checked) {
      picture.style.filter = 'blur(' + getPinValueRange(currentPinValue, BLUR_MIN_VALUE, BLUR_MAX_VALUE) + 'px)';
    } else if (radioFilters[5].checked) {
      picture.style.filter = 'brightness(' + getPinValueRange(currentPinValue, BRIGHTNESS_MIN_VALUE, BRIGHTNESS_MAX_VALUE) + ')';
    }
  };
  changeFilters();

  window.slider = {
    picture: picture
  };
})();
