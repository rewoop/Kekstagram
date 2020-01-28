'use strict';

var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var getRandomArrayElem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (minAmount, maxAmount) {
  return Math.round(Math.random() * (maxAmount - minAmount) + minAmount);
};

var getComments = function (avatar, message, name) {
  return {
    avatar: avatar,
    message: getRandomArrayElem(message),
    name: getRandomArrayElem(name)
  };
};

var getAvatar = function (minAmount, maxAmount) {
  return 'img/avatar-' + getRandomNumber(minAmount, maxAmount) + '.svg';
};

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
];

var names = ['Игнат', 'Валера', 'Вася', 'Глаша', 'Зоя', 'Эльвира'];

var commentsArr = [];

for (var i = 0; i < 3; i++) {
  commentsArr.push(getComments(getAvatar(MIN_AVATARS, MAX_AVATARS), messages, names));
}

var getDescriptions = function (url, desc, comments) {
  return {
    url: 'здесь будет функция!',
    desc: '',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: 'здесь будет массив!'
  };
};

var description = [];

for (var j = 0; j < 25; j++) {
  description.push(getDescriptions());
}
