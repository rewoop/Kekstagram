'use strict';

(function () {
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var main = document.querySelector('main');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorPopup.querySelector('.error__title');
  var errorBtn = errorPopup.querySelector('.error__button');

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
    errorTitle.textContent = errorMessage;
    errorBtn.textContent = 'Попробуйте снова';
    main.appendChild(errorPopup);

    errorBtn.addEventListener('click', function () {
      main.removeChild(errorPopup);
      setTimeout(function () {
        window.backend.load(successHandler, errorHandler);
      }, 300);
    });
  };

  window.backend.load(successHandler, errorHandler);

  window.gallery = {
    picturesContainer: picturesContainer,
    main: main,
    errorPopup: errorPopup,
    errorBtn: errorBtn
  };
})();
