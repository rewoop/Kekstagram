'use strict';

(function () {
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var filters = document.querySelectorAll('.effects__item');
  var radioFilters = document.querySelectorAll('.effects__radio');
  var pictureDiv = document.querySelector('.img-upload__preview');
  var picture = pictureDiv.querySelector('img');

  var pinValue = 0.2;
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
        getFilterValue(pinValue);
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
    for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener('change', function () {
        resetSliderValue();
        if (radioFilters[0].checked) {
          effectLevel.classList.add('hidden');
          removeFilters();
        } else if (radioFilters[1].checked || radioFilters[2].checked || radioFilters[3].checked || radioFilters[4].checked || radioFilters[5].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
        }
      });
    }
  };

  var getPinValueRange = function (pinValueNumber, minAmount, maxAmount) {
    return pinValueNumber * (maxAmount - minAmount) + minAmount;
  };

  var getFilterValue = function (currentPinValue) {
    if (radioFilters[0].checked) {
      removeFilters();
    } else if (radioFilters[1].checked) {
      removeFilters();
      picture.classList.add('effects__preview--chrome');
      picture.style.filter = 'grayscale(' + currentPinValue + ')';
    } else if (radioFilters[2].checked) {
      removeFilters();
      picture.classList.add('effects__preview--sepia');
      picture.style.filter = 'sepia(' + currentPinValue + ')';
    } else if (radioFilters[3].checked) {
      removeFilters();
      picture.classList.add('effects__preview--marvin');
      picture.style.filter = 'invert(' + (currentPinValue * 100) + '%)';
    } else if (radioFilters[4].checked) {
      removeFilters();
      picture.classList.add('effects__preview--phobos');
      picture.style.filter = 'blur(' + getPinValueRange(currentPinValue, 0, 3) + 'px)';
    } else if (radioFilters[5].checked) {
      removeFilters();
      picture.classList.add('effects__preview--heat');
      picture.style.filter = 'brightness(' + getPinValueRange(currentPinValue, 1, 3) + ')';
    }
  };
  changeFilters();

  window.slider = {
    picture: picture
  };
})();
