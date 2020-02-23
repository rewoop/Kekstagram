'use strict';

(function () {
  var MAX_COMMENTS_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentItem = commentsList.querySelector('.social__comment');
  var showMoreCommentsBtn = bigPicture.querySelector('.comments-loader');

  var getComments = function (photo) {
    var comment = commentItem.cloneNode(true);
    comment.querySelector('.social__picture').src = photo.avatar;
    comment.querySelector('.social__picture').alt = photo.name;
    comment.querySelector('.social__text').textContent = photo.message;
    return comment;
  };

  var commentsCount = 0;
  var currentPicture = {};

  var makeFirstComments = function (fragment, item) {
    commentsCount = Math.min(item.comments.length, MAX_COMMENTS_COUNT);
    showMoreCommentsBtn.classList.remove('hidden');
    if (item.comments.length < MAX_COMMENTS_COUNT) {
      showMoreCommentsBtn.classList.add('hidden');
    }
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(getComments(item.comments[i]));
    }
    return fragment;
  };

  var makeComments = function (photoComments) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    makeFirstComments(fragment, photoComments);
    return commentsList.appendChild(fragment);
  };

  var renderBigPicture = function (picturesArray) {
    bigPicture.querySelector('img').src = picturesArray.url;
    bigPicture.querySelector('.likes-count').textContent = picturesArray.likes;
    bigPicture.querySelector('.comments-count').textContent = picturesArray.comments.length;
    makeComments(picturesArray);
    bigPicture.querySelector('.social__caption').textContent = picturesArray.description;
  };

  var onEscapeKeydown = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      onClosePictureClick();
    }
  };

  var onShowMoreBtnClick = function (item) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    if ((item.comments.length - commentsCount) > MAX_COMMENTS_COUNT) {
      commentsCount += MAX_COMMENTS_COUNT;

      for (var i = 0; i < commentsCount; i++) {
        fragment.appendChild(getComments(item.comments[i]));
      }
    } else if ((item.comments.length - commentsCount) <= MAX_COMMENTS_COUNT) {
      commentsCount = item.comments.length;
      showMoreCommentsBtn.classList.add('hidden');

      for (var j = 0; j < commentsCount; j++) {
        fragment.appendChild(getComments(item.comments[j]));
      }
    }
    return commentsList.appendChild(fragment);
  };

  var onAddOrRemoveClick = function () {
    onShowMoreBtnClick(currentPicture);
  };

  var onOpenPictureClick = function (evt, item) {
    evt.preventDefault();
    renderBigPicture(item);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeydown);
    currentPicture = item;
    showMoreCommentsBtn.addEventListener('click', onAddOrRemoveClick);
  };

  var onClosePictureClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapeKeydown);
    commentsCount = MAX_COMMENTS_COUNT;
    showMoreCommentsBtn.removeEventListener('click', onAddOrRemoveClick);
  };

  var pictureCloseButton = bigPicture.querySelector('.cancel');

  var chooseBigPicture = function (collection, array) {
    collection.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        onOpenPictureClick(evt, array[index]);
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
