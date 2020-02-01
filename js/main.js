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
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = picturesArray.url;
  bigPicture.querySelector('.likes-count').textContent = picturesArray.likes;
  bigPicture.querySelector('.comments-count').textContent = picturesArray.comments.length;
  makeComments(picturesArray);
  bigPicture.querySelector('.social__caption').textContent = picturesArray.description;
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');

renderBigPicture(descriptionsArr[0]);
