'use strict';

(function () {
  var RADIX = 10;
  var DEFAULT_SCALE_VALUE = '100%';
  var DEFAULT_FACTOR = 100;

  var uploadFile = window.gallery.picturesContainer.querySelector('#upload-file');
  var imgUploadOverlay = window.gallery.picturesContainer.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseButton = window.gallery.picturesContainer.querySelector('.cancel');
  var scaleValue = document.querySelector('.scale__control--value');
  var image = window.slider.picture;
  var effectLevel = document.querySelector('.effect-level');
  var radioFilters = document.querySelectorAll('.effects__radio');

  var onEscapePictureOverlayKeydown = function (evt) {
    if (evt.key === window.preview.ESC_KEY) {
      onUploadFileCloseChange();
    }
  };

  var onUploadFileChange = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePictureOverlayKeydown);
    resetFilterAndScale();
  };

  var onUploadFileCloseChange = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePictureOverlayKeydown);
    uploadFile.value = '';
  };

  var resetFilterAndScale = function () {
    scaleValue.value = DEFAULT_SCALE_VALUE;
    image.style.transform = 'scale(' + (parseInt(scaleValue.value, RADIX) / DEFAULT_FACTOR) + ')';
    image.style.filter = '';
    image.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevel.classList.add('hidden');
    radioFilters[0].checked = 'checked';
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  imgUploadOverlayCloseButton.addEventListener('click', onUploadFileCloseChange);
  imgUploadOverlayCloseButton.addEventListener('click', function (evt) {
    if (evt.key === window.preview.ENTER_KEY) {
      onUploadFileCloseChange();
    }
  });

  window.form = {
    onEscapePictureOverlayKeydown: onEscapePictureOverlayKeydown
  };
})();
