'use strict';

(function () {
  var MAX_RANDOM_PHOTOS = 10;
  var VALUE_INDEX_OF = -1;

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

  var photos = [];
  var randomPhotos = [];
  var discussedPhotos = [];

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

  var render = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (item) {
      fragment.appendChild(getPhoto(item));
    });
    picturesContainer.appendChild(fragment);
    window.preview.chooseBigPicture(picturesContainer.querySelectorAll('.picture'), pictures);

  };

  var resetActiveClassAndContainer = function () {
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    picturesContainer.querySelectorAll('.picture').forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var filterPhoto = function () {
    render(photos);

    defaultFilter.addEventListener('click', function () {
      window.debounce(function () {
        resetActiveClassAndContainer();
        defaultFilter.classList.add('img-filters__button--active');
        render(photos);
      });
    });

    randomFilter.addEventListener('click', function () {
      window.debounce(function () {
        resetActiveClassAndContainer();
        randomPhotos = [];
        randomFilter.classList.add('img-filters__button--active');
        while (randomPhotos.length < MAX_RANDOM_PHOTOS) {
          var randomPicture = getRandomArrayElem(photos);
          if (randomPhotos.indexOf(randomPicture) === VALUE_INDEX_OF) {
            randomPhotos.push(randomPicture);
          }
        }
        render(randomPhotos);
      });
    });

    discussedFilter.addEventListener('click', function () {
      window.debounce(function () {
        resetActiveClassAndContainer();
        discussedFilter.classList.add('img-filters__button--active');
        discussedPhotos = photos.slice().sort(function (left, right) {
          var rankDiff = right.comments.length - left.comments.length;
          if (rankDiff === 0) {
            rankDiff = photos.indexOf(left) - photos.indexOf(right);
          }
          return rankDiff;
        });
        render(discussedPhotos);
      });
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
    errorBtn: errorBtn,
    errorTitle: errorTitle
  };
})();
