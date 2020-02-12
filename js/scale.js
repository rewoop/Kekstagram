'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = '100%';
  var RADIX = 10;
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;

  var scale = document.querySelector('.scale');
  var btnMinus = scale.querySelector('.scale__control--smaller');
  var btnPlus = scale.querySelector('.scale__control--bigger');
  var scaleValue = scale.querySelector('.scale__control--value');
  var image = window.slider.picture;

  scaleValue.value = DEFAULT_SCALE_VALUE;

  btnMinus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, RADIX) > SCALE_STEP) {
      scaleValue.value = (parseInt(scaleValue.value, RADIX) - SCALE_STEP) + '%';
      makeScaleImage(scaleValue.value);
    }
  });
  btnPlus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, RADIX) < MAX_SCALE_VALUE) {
      scaleValue.value = (parseInt(scaleValue.value, RADIX) + SCALE_STEP) + '%';
      makeScaleImage(scaleValue.value);
    }
  });

  var makeScaleImage = function (scalePoints) {
    image.style.transform = 'scale(' + (parseInt(scalePoints, RADIX) / MAX_SCALE_VALUE) + ')';
  };
})();
