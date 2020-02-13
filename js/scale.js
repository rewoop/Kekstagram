'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;

  var scale = document.querySelector('.scale');
  var btnMinus = scale.querySelector('.scale__control--smaller');
  var btnPlus = scale.querySelector('.scale__control--bigger');
  var scaleValue = scale.querySelector('.scale__control--value');
  var image = window.form.image;

  scaleValue.value = window.constants.DEFAULT_SCALE_VALUE;

  btnMinus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, window.constants.RADIX) > SCALE_STEP) {
      scaleValue.value = (parseInt(scaleValue.value, window.constants.RADIX) - SCALE_STEP) + '%';
      makeScaleImage(scaleValue.value);
    }
  });
  btnPlus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, window.constants.RADIX) < MAX_SCALE_VALUE) {
      scaleValue.value = (parseInt(scaleValue.value, window.constants.RADIX) + SCALE_STEP) + '%';
      makeScaleImage(scaleValue.value);
    }
  });

  var makeScaleImage = function (scalePoints) {
    image.style.transform = 'scale(' + (parseInt(scalePoints, window.constants.RADIX) / MAX_SCALE_VALUE) + ')';
  };
})();
