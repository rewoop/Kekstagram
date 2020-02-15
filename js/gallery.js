'use strict';

(function () {
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  var getPhoto = function (description) {
    var photoDescription = picture.cloneNode(true);
    photoDescription.querySelector('.picture__img').src = description.url;
    photoDescription.querySelector('.picture__likes').textContent = description.likes;
    photoDescription.querySelector('.picture__comments').textContent = description.comments.length;
    return photoDescription;
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(getPhoto(item));
    });
    picturesContainer.appendChild(fragment);
    window.preview.chooseBigPicture(picturesContainer.querySelectorAll('.picture'));
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.gallery = {
    picturesContainer: picturesContainer,
    errorHandler: errorHandler
  };
})();
