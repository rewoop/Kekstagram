'use strict';

(function () {
  var SPACE_HASHTAG_SEPARATOR = ' ';
  var REG_EXP = /(^|\B)#([a-zA-Z0-9А-ЯЁа-яё]{1,19})/;
  var REG_EXP_SYMBOLS = /\W[^a-zA-Z0-9А-ЯЁа-яё]/;
  var REG_EXP_SYMBOL_LATTICE = /[\#]/;
  var MAX_HASHTAGS_AMOUNT = 5;

  var hashtagInput = window.gallery.picturesContainer.querySelector('.text__hashtags');
  var photoTextArea = window.gallery.picturesContainer.querySelector('.text__description');
  var hashtagsArr = [];

  var stringToArray = function (stringToSplit, separator) {
    return stringToSplit.split(separator);
  };

  var checkHashtagsArrayDuplicate = function (hashtags) {
    return hashtags.some(function (item) {
      return hashtags.indexOf(item) !== hashtags.lastIndexOf(item);
    });
  };

  var validateHashtag = function () {
    hashtagInput.addEventListener('change', function () {
      hashtagsArr = stringToArray(hashtagInput.value, SPACE_HASHTAG_SEPARATOR);
      hashtagsArr.forEach(function (item) {
        var isHashtagValid = REG_EXP.test(item);
        var isHashtagHaveSymbols = REG_EXP_SYMBOLS.test(item);
        var isLatticeDuplicated = REG_EXP_SYMBOL_LATTICE.test(item.substring(1));
        item = item.toLowerCase();
        var isHashtagDuplicated = checkHashtagsArrayDuplicate(hashtagsArr);

        if (isHashtagHaveSymbols || isLatticeDuplicated) {
          hashtagInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
          hashtagInput.style.border = '2px solid red';
        } else if (!(isHashtagValid)) {
          hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа # и не может состоять только из одной решётки; Максимальная длина одного хэш-тега 20 символов, включая решётку; Хэш-теги разделяются пробелами.');
          hashtagInput.style.border = '2px solid red';
        } else if (hashtagsArr.length > MAX_HASHTAGS_AMOUNT) {
          hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
          hashtagInput.style.border = '2px solid red';
        } else if (isHashtagDuplicated) {
          hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
          hashtagInput.style.border = '2px solid red';
        } else {
          hashtagInput.setCustomValidity('');
        }
      });
    });
    hashtagInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', window.form.onEscapePictureOverlayKeydown);
    });
    hashtagInput.addEventListener('blur', function () {
      document.addEventListener('keydown', window.form.onEscapePictureOverlayKeydown);
    });
  };

  photoTextArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onEscapePictureOverlayKeydown);
  });
  photoTextArea.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onEscapePictureOverlayKeydown);
  });

  validateHashtag();
})();
