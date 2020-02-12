'use strict';

(function () {
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

  window.data = {
    descriptionsArr: descriptionsArr
  };
})();
