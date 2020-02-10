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

  var renderPhotos = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.descriptionsArr.length; i++) {
      fragment.appendChild(getPhoto(window.data.descriptionsArr[i]));
    }
    return picturesContainer.appendChild(fragment);
  };

  renderPhotos();

  window.gallery = {
    picturesContainer: picturesContainer
  };
})();
