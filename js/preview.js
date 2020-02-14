'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentItem = commentsList.querySelector('.social__comment');

  var getComments = function (photo) {
    var comment = commentItem.cloneNode(true);
    comment.querySelector('.social__picture').src = photo.avatar;
    comment.querySelector('.social__picture').alt = photo.name;
    comment.querySelector('.social__text').textContent = photo.message;
    return comment;
  };

  var makeComments = function (photoComments) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    photoComments.comments.forEach(function (item) {
      fragment.appendChild(getComments(item));
    });
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

  var onEscapeKeydown = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      onClosePictureClick();
    }
  };

  var onOpenPictureClick = function (evt, index) {
    evt.preventDefault();
    renderBigPicture(window.data.descriptionsArr[index]);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeydown);
  };

  var onClosePictureClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  var pictureCloseButton = bigPicture.querySelector('.cancel');

  var chooseBigPicture = function (pictureItem) {
    pictureItem.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        onOpenPictureClick(evt, index);
      });
    });
  };

  pictureCloseButton.addEventListener('click', onClosePictureClick);
  pictureCloseButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      onClosePictureClick();
    }
  });

  window.preview = {
    chooseBigPicture: chooseBigPicture
  };
})();
