'use strict';

(function () {
  var scale = document.querySelector('.scale');
  var btnMinus = scale.querySelector('.scale__control--smaller');
  var btnPlus = scale.querySelector('.scale__control--bigger');
  var scaleValue = scale.querySelector('.scale__control--value');
  var image = window.slider.picture;

  scaleValue.value = '100%';

  btnMinus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, 10) > 25) {
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
      makeScaleImage(scaleValue.value);
    }
  });
  btnPlus.addEventListener('click', function () {
    if (parseInt(scaleValue.value, 10) < 100) {
      scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
      makeScaleImage(scaleValue.value);
    }
  });

  var makeScaleImage = function (scalePoints) {
    image.style.transform = 'scale(' + (parseInt(scalePoints, 10) / 100) + ')';
  };
})();
