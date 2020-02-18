'use strict';

(function () {
  var MAX_RANDOM_PHOTOS = 10;

  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var main = document.querySelector('main');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorPopup.querySelector('.error__title');
  var errorBtn = errorPopup.querySelector('.error__button');
  var imageFilters = document.querySelector('.img-filters');
  var defaultFilter = imageFilters.querySelector('#filter-default');
  var randomFilter = imageFilters.querySelector('#filter-random');
  var discussedFilter = imageFilters.querySelector('#filter-discussed');
  var picturesArray = picturesContainer.querySelectorAll('.picture');

  var getRandomArrayElem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getPhoto = function (description) {
    var photoDescription = picture.cloneNode(true);
    photoDescription.querySelector('.picture__img').src = description.url;
    photoDescription.querySelector('.picture__likes').textContent = description.likes;
    photoDescription.querySelector('.picture__comments').textContent = description.comments.length;
    return photoDescription;
  };

  var render = function (picture) {
    var fragment = document.createDocumentFragment();
    picture.forEach(function (item) {
      fragment.appendChild(getPhoto(item));
    });
    picturesContainer.appendChild(fragment);
    window.preview.chooseBigPicture(picturesArray);
  };

  var photos = [];
  var randomPhotos = [];

  var deleteActiveClass = function () {
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');

    picturesArray.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var checkPhotosDuplicate = function (photos) {
    return photos.some(function (item) {
      return photos.indexOf(item) !== photos.lastIndexOf(item);
    });
  };


  var filterPhoto = function () {
    render(photos);

    defaultFilter.addEventListener('click', function () {
      deleteActiveClass();
      defaultFilter.classList.add('img-filters__button--active');
    });

    randomFilter.addEventListener('click', function () {
      deleteActiveClass();
      randomPhotos = [];
      randomFilter.classList.add('img-filters__button--active');
      for (var i = 0; i < MAX_RANDOM_PHOTOS; i++) {
        randomPhotos.push(photos[i])
        // if (!(checkPhotosDuplicate(randomPhotos))) {
        //
        // }
      }
      render(randomPhotos);
    });

    discussedFilter.addEventListener('click', function () {
      deleteActiveClass();
      discussedFilter.classList.add('img-filters__button--active');
    });
  };


  var successHandler = function (data) {
    imageFilters.classList.remove('img-filters--inactive');
    photos = data;
    filterPhoto();
  };

  var errorHandler = function (errorMessage) {
    errorTitle.textContent = errorMessage;
    errorTitle.style.lineHeight = '1.15';
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
