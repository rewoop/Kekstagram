'use strict';

(function () {
  var BLUR_MIN_VALUE = 0;
  var BLUR_AND_BRIGHTNESS_MAX_VALUE = 3;
  var BRIGHTNESS_MIN_VALUE = 1;

  var uploadFile = window.gallery.picturesContainer.querySelector('#upload-file');
  var imgUploadOverlay = window.gallery.picturesContainer.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseButton = window.gallery.picturesContainer.querySelector('.cancel');
  var scaleValue = document.querySelector('.scale__control--value');
  var pictureDiv = document.querySelector('.img-upload__preview');
  var image = pictureDiv.querySelector('img');
  var filtersPreview = document.querySelectorAll('.effects__preview');
  var filters = document.querySelectorAll('.effects__item');
  var radioFilters = document.querySelectorAll('.effects__radio');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var form = document.querySelector('.img-upload__form');
  var hashtag = window.gallery.picturesContainer.querySelector('.text__hashtags');
  var comment = window.gallery.picturesContainer.querySelector('.text__description');
  var main = window.gallery.main;
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var successBtn = successMessage.querySelector('.success__button');
  var errorMessage = window.gallery.errorPopup;
  var errorBtn = window.gallery.errorBtn;

  var setDefaultPreviewAndFiltersPreview = function () {
    image.src = 'img/upload-default-image.jpg';
    filtersPreview.forEach(function (item) {
      item.style = '';
    });
  };

  var onEscapePictureOverlayKeydown = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
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
    setDefaultPreviewAndFiltersPreview();
  };

  var currentFilter = '';

  var resetFilterAndScale = function () {
    scaleValue.value = window.constants.DEFAULT_SCALE_VALUE;
    image.style.transform = 'scale(' + (parseInt(scaleValue.value, window.constants.RADIX) / window.constants.DEFAULT_FACTOR) + ')';
    image.style.filter = '';
    if (currentFilter) {
      image.classList.remove(currentFilter);
    }
    effectLevel.classList.add('hidden');
    hashtag.style.border = '';
    radioFilters[0].checked = 'checked';
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  imgUploadOverlayCloseButton.addEventListener('click', onUploadFileCloseChange);
  imgUploadOverlayCloseButton.addEventListener('click', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      onUploadFileCloseChange();
    }
  });

  var resetSliderValue = function () {
    effectLevelPin.style = '';
    effectLevelDepth.style.width = '';
    effectLevelValue.value = '';
  };

  var removeFilters = function () {
    if (currentFilter) {
      image.classList.remove(currentFilter);
    }
    image.style.filter = '';
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
          currentFilter = 'effects__preview--chrome';
          image.classList.add('effects__preview--chrome');
          image.style.filter = 'grayscale(' + window.constants.DEFAULT_PIN_VALUE + ')';
        } else if (radioFilters[2].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          currentFilter = 'effects__preview--sepia';
          image.classList.add('effects__preview--sepia');
          image.style.filter = 'sepia(' + window.constants.DEFAULT_PIN_VALUE + ')';
        } else if (radioFilters[3].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          currentFilter = 'effects__preview--marvin';
          image.classList.add('effects__preview--marvin');
          image.style.filter = 'invert(' + (window.constants.DEFAULT_PIN_VALUE * window.constants.DEFAULT_FACTOR) + '%)';
        } else if (radioFilters[4].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          currentFilter = 'effects__preview--phobos';
          image.classList.add('effects__preview--phobos');
          image.style.filter = 'blur(' + getPinValueRange(window.constants.DEFAULT_PIN_VALUE, BLUR_MIN_VALUE, BLUR_AND_BRIGHTNESS_MAX_VALUE) + 'px)';
        } else if (radioFilters[5].checked) {
          effectLevel.classList.remove('hidden');
          removeFilters();
          currentFilter = 'effects__preview--heat';
          image.classList.add('effects__preview--heat');
          image.style.filter = 'brightness(' + getPinValueRange(window.constants.DEFAULT_PIN_VALUE, BRIGHTNESS_MIN_VALUE, BLUR_AND_BRIGHTNESS_MAX_VALUE) + ')';
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
      image.style.filter = 'grayscale(' + currentPinValue + ')';
    } else if (radioFilters[2].checked) {
      image.style.filter = 'sepia(' + currentPinValue + ')';
    } else if (radioFilters[3].checked) {
      image.style.filter = 'invert(' + (currentPinValue * window.constants.DEFAULT_FACTOR) + '%)';
    } else if (radioFilters[4].checked) {
      image.style.filter = 'blur(' + getPinValueRange(currentPinValue, BLUR_MIN_VALUE, BLUR_AND_BRIGHTNESS_MAX_VALUE) + 'px)';
    } else if (radioFilters[5].checked) {
      image.style.filter = 'brightness(' + getPinValueRange(currentPinValue, BRIGHTNESS_MIN_VALUE, BLUR_AND_BRIGHTNESS_MAX_VALUE) + ')';
    }
  };
  changeFilters();

  var resetData = function () {
    imgUploadOverlay.classList.add('hidden');
    hashtag.value = '';
    comment.value = '';
    uploadFile.value = '';
  };

  var checkSuccessMessage = function () {
    successBtn.addEventListener('click', function () {
      if (main.contains(successMessage)) {
        main.removeChild(successMessage);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (main.contains(successMessage) && evt.key === window.constants.ESC_KEY) {
        main.removeChild(successMessage);
      }
    });

    document.addEventListener('click', function (evt) {
      if (main.contains(successMessage) && successMessage.querySelector('.success__inner') !== evt.target) {
        main.removeChild(successMessage);
      }
    });
  };

  var checkErrorMessage = function () {
    errorBtn.addEventListener('click', function () {
      if (main.contains(errorMessage)) {
        main.removeChild(errorMessage);
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (main.contains(errorMessage) && evt.key === window.constants.ESC_KEY) {
        main.removeChild(errorMessage);
      }
    });

    document.addEventListener('click', function (evt) {
      if (main.contains(errorMessage) && errorMessage.querySelector('.error__inner') !== evt.target) {
        main.removeChild(errorMessage);
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      resetData();
      setDefaultPreviewAndFiltersPreview();
      main.appendChild(successMessage);
      checkSuccessMessage();
    }, function () {
      imgUploadOverlay.classList.add('hidden');
      resetData();
      setDefaultPreviewAndFiltersPreview();
      main.appendChild(errorMessage);
      checkErrorMessage();
    });
  });

  window.form = {
    onEscapePictureOverlayKeydown: onEscapePictureOverlayKeydown,
    getFilterValue: getFilterValue,
    image: image,
    uploadFile: uploadFile,
    filtersPreview: filtersPreview
  };
})();
