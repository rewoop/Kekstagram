'use strict';

var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var DESCRIPTIONS_AMOUNT = 25;
var NAMES = ['Игнат', 'Валера', 'Вася', 'Глаша', 'Зоя', 'Эльвира'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var SPACE_HASHTAG_SEPARATOR = ' ';
var DEFAULT_EFFECT_PIN_POSITION = '20%';
var DEFAULT_EFFECT_LEVEL_VALUE = 10;
var REG_EXP = /(^|\B)#([a-zA-Z0-9А-ЯЁа-яё]{1,19})/;
var REG_EXP_SYMBOLS = /\W[^a-zA-Z0-9А-ЯЁа-яё]/;
var REG_EXP_SYMBOL_LATTICE = /[\#]/;

var getRandomArrayElem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (minAmount, maxAmount) {
  return Math.round(Math.random() * (maxAmount - minAmount) + minAmount);
};

var createLink = function (amountLinks) {
  return 'photos/' + amountLinks + '.jpg';
};

var createAvatarLink = function (minAmount, maxAmount) {
  return 'img/avatar-' + getRandomNumber(minAmount, maxAmount) + '.svg';
};

var createComment = function (avatar, message, name) {
  return {
    avatar: avatar,
    message: getRandomArrayElem(message),
    name: getRandomArrayElem(name)
  };
};

var createCommentsArray = function (countComments) {
  var array = [];
  for (var i = 0; i < countComments; i++) {
    array.push(createComment(createAvatarLink(MIN_AVATARS, MAX_AVATARS), MESSAGES, NAMES));
  }
  return array;
};

var createDescription = function (url) {
  return {
    url: createLink(url + 1),
    description: 'Кайфуем',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: createCommentsArray(getRandomNumber(1, 3))
  };
};

var descriptionsArr = [];

var makeDescription = function () {
  for (var i = 0; i < DESCRIPTIONS_AMOUNT; i++) {
    descriptionsArr.push(createDescription(i));
  }
};

makeDescription();

var picture = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

var getPhoto = function (description) {
  var photoDescription = picture.cloneNode(true);
  photoDescription.querySelector('.picture__img').src = description.url;
  photoDescription.querySelector('.picture__likes').textContent = description.likes;
  photoDescription.querySelector('.picture__comments').textContent = description.comments.length;
  return photoDescription;
};

var renderPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < descriptionsArr.length; i++) {
    fragment.appendChild(getPhoto(descriptionsArr[i]));
  }
  return picturesContainer.appendChild(fragment);
};

renderPhotos();

var bigPicture = document.querySelector('.big-picture');
var commentsList = document.querySelector('.social__comments');
var commentItem = commentsList.querySelector('.social__comment');
commentsList.innerHTML = '';

var getComments = function (photo) {
  var comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = photo.avatar;
  comment.querySelector('.social__picture').alt = photo.name;
  comment.querySelector('.social__text').textContent = photo.message;
  return comment;
};

var makeComments = function (photoComments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoComments.comments.length; i++) {
    fragment.appendChild(getComments(photoComments.comments[i]));
  }
  return commentsList.appendChild(fragment);
};

var renderBigPicture = function (picturesArray) {
  bigPicture.querySelector('img').src = picturesArray.url;
  bigPicture.querySelector('.likes-count').textContent = picturesArray.likes;
  bigPicture.querySelector('.comments-count').textContent = picturesArray.comments.length;
  makeComments(picturesArray);
  bigPicture.querySelector('.social__caption').textContent = picturesArray.description;
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

renderBigPicture(descriptionsArr[0]);

var onEscapeKeydown = function (evt) {
  if (evt.key === ESC_KEY) {
    onClosePictureClick();
  }
};

var onOpenPictureClick = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeydown);
};

var onClosePictureClick = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
};

var pictureItem = picturesContainer.querySelectorAll('.picture');
var pictureCloseButton = bigPicture.querySelector('.cancel');

pictureItem[0].addEventListener('click', onOpenPictureClick);

pictureCloseButton.addEventListener('click', onClosePictureClick);
pictureCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    onClosePictureClick();
  }
});

var uploadFile = picturesContainer.querySelector('#upload-file');
var imgUploadOverlay = picturesContainer.querySelector('.img-upload__overlay');
var imgUploadOverlayCloseButton = picturesContainer.querySelector('.cancel');

var onEscapePictureOverlayKeydown = function (evt) {
  if (evt.key === ESC_KEY) {
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
  if (evt.key === ENTER_KEY) {
    onUploadFileCloseChange();
  }
});

// ЗДЕСЬ ИДЕТ КОД СЛАЙДЕРА!!!
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');

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
// КОНЕЦ КОДА СЛАЙДЕРА!!!

// Модуль сброса эффектов при смене фильтра
var filters = document.querySelectorAll('.effects__item');

var resetSliderValue = function () {
  effectLevelPin.style.left = DEFAULT_EFFECT_PIN_POSITION;
  effectLevelDepth.style.width = DEFAULT_EFFECT_PIN_POSITION;
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL_VALUE;
};

var changeFilters = function () {
  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', function () {
      resetSliderValue();
    });
  }
};
changeFilters();
// Конец модуля сброса эффектов при смене фильтра

// Начало модуля валидации хэштегов
var hashtagInput = picturesContainer.querySelector('.text__hashtags');
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
  hashtagInput.addEventListener('input', function () {
    hashtagsArr = stringToArray(hashtagInput.value, SPACE_HASHTAG_SEPARATOR);
    hashtagsArr.forEach(function (item) {
      var isHashtagValid = REG_EXP.test(item);
      var isHashtagHaveSymbols = REG_EXP_SYMBOLS.test(item);
      var isLatticeDuplicated = REG_EXP_SYMBOL_LATTICE.test(item.substring(1));
      item = item.toLowerCase();
      var isHashtagDuplicated = checkHashtagsArrayDuplicate(hashtagsArr);

      if (isHashtagHaveSymbols || isLatticeDuplicated) {
        hashtagInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
      } else if (!(isHashtagValid)) {
        hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа # и не может состоять только из одной решётки; Максимальная длина одного хэш-тега 20 символов, включая решётку; Хэш-теги нечувствительны к регистру; Хэш-теги разделяются пробелами.');
      } else if (hashtagsArr.length > 5) {
        hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
      } else if (isHashtagDuplicated) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
      } else {
        hashtagInput.setCustomValidity('');
      }
    });
  });
  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscapePictureOverlayKeydown);
  });
  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscapePictureOverlayKeydown);
  });
};

validateHashtag();
// Конец модуля валидации хэштегов
