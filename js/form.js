'use strict';

(function () {
  var uploadFile = window.gallery.picturesContainer.querySelector('#upload-file');
  var imgUploadOverlay = window.gallery.picturesContainer.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseButton = window.gallery.picturesContainer.querySelector('.cancel');

  var onEscapePictureOverlayKeydown = function (evt) {
    if (evt.key === window.preview.ESC_KEY) {
      onUploadFileCloseChange();
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
