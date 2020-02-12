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

  var onEscapePictureOverlayKeydown = function (evt) {
    if (evt.key === window.preview.ESC_KEY) {
      onUploadFileCloseChange();
      resetFilterAndScale();
    }
  };

  var onUploadFileChange = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePictureOverlayKeydown);
  };

  var onUploadFileCloseChange = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePictureOverlayKeydown);
    uploadFile.value = '';
    resetFilterAndScale();
  };

  var resetFilterAndScale = function () {
    scaleValue.value = DEFAULT_SCALE_VALUE;
    image.style.transform = 'scale(' + (parseInt(scaleValue.value, RADIX) / DEFAULT_FACTOR) + ')';
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
