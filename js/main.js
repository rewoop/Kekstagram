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

var escapeKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closePictureClickHandler();
  }
};

var openPictureClickHandler = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
};

var closePictureClickHandler = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
};

var pictureItem = picturesContainer.querySelectorAll('.picture');
var pictureCloseButton = bigPicture.querySelector('.cancel');

pictureItem[0].addEventListener('click', openPictureClickHandler);

pictureCloseButton.addEventListener('click', closePictureClickHandler);
pictureCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePictureClickHandler();
  }
});

var uploadFile = picturesContainer.querySelector('#upload-file');
var imgUploadOverlay = picturesContainer.querySelector('.img-upload__overlay');
var imgUploadOverlayCloseButton = picturesContainer.querySelector('.cancel');

var escapePictureOverlayKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    uploadFileCloseChangeHandler();
  }
};

var uploadFileChangeHandler = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapePictureOverlayKeydownHandler);
};

var uploadFileCloseChangeHandler = function () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapePictureOverlayKeydownHandler);
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

imgUploadOverlayCloseButton.addEventListener('click', uploadFileCloseChangeHandler);
imgUploadOverlayCloseButton.addEventListener('click', function (evt) {
  if (evt.key === ENTER_KEY) {
    uploadFileCloseChangeHandler();
  }
});

// var effectLevelValue = picturesContainer.querySelector('.effect-level__value');
// var effectLevelLine = picturesContainer.querySelector('.effect-level__line');
// var effectLevelPin = picturesContainer.querySelector('.effect-level__pin');
// var effectLevelDepth = picturesContainer.querySelector('.effect-level__depth');
//
// effectLevelPin.addEventListener('mouseup', function () {
//   effectLevelLine.offsetWidth;
// });

var hashtagInput = picturesContainer.querySelector('.text__hashtags');
var hashtagsArr = [];

var stringToArray = function (stringToSplit, separator) {
  return stringToSplit.split(separator);
};

hashtagInput.addEventListener('change', function () {
  hashtagsArr.push(stringToArray(hashtagInput.value, SPACE_HASHTAG_SEPARATOR));
});

// var hashtagValidate = function (hashtag) {
//   for (var i = 0; i < hashtag.length; i++) {
//
//   }
// };
//
//
// hashtagValidate(hashtagsArr);

// if (hashtagInput[i].value.substr(0, 1) !== '#') { // Начало хэш-тега с символа #
//   // setCustomValidity
// } else if (hashtagInput[i].value.length < 2 && hashtagInput[i].value.length > 20) { // хеш-тег не может состоять только из одной решётки и быть больше 20 символов;
//   // setCustomValidity
// } else if (hashtagInput.length > 5) { // нельзя указать больше пяти хэш-тегов;
//   // setCustomValidity
// }
//
// hashtagInput.addEventListener('focus', function () {
//   document.removeEventListener('keydown', escapePictureOverlayKeydownHandler);
// });
// hashtagInput.addEventListener('blur', function () {
//   document.addEventListener('keydown', escapePictureOverlayKeydownHandler);
// });
