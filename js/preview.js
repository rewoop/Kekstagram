'use strict';

(function () {
  var MAX_COMMENTS_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentItem = commentsList.querySelector('.social__comment');
  // var showMoreCommentsBtn = bigPicture.querySelector('.comments-loader');

  var getComments = function (photo) {
    var comment = commentItem.cloneNode(true);
    comment.querySelector('.social__picture').src = photo.avatar;
    comment.querySelector('.social__picture').alt = photo.name;
    comment.querySelector('.social__text').textContent = photo.message;
    return comment;
  };

  var commentsCount = 0;

  var getCommentsCount = function (fragment, item) {
    if (item.comments.length < MAX_COMMENTS_COUNT) {
      commentsCount = item.comments.length;
    } else {
      commentsCount = MAX_COMMENTS_COUNT;
    }
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(getComments(item.comments[i]));
    }


    // showMoreCommentsBtn.addEventListener('click', function () {
    //   if ((item.comments.length - MAX_COMMENTS_COUNT) > 5) {
    //     MAX_COMMENTS_COUNT += 5;
    //     console.log(MAX_COMMENTS_COUNT + ' - 5 комментов добавилось, потому что больше 5');
    //   } else if ((item.comments.length - MAX_COMMENTS_COUNT) < 5) {
    //     MAX_COMMENTS_COUNT = item.comments.length;
    //     console.log(MAX_COMMENTS_COUNT + ' - остатки комментов добавились, потому что меньше 5');
    //   }
    // });

    return fragment;
  };

  var makeComments = function (photoComments) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    getCommentsCount(fragment, photoComments);
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

  var onOpenPictureClick = function (evt, index, array) {
    evt.preventDefault();
    renderBigPicture(array[index]);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeydown);
  };

  var onClosePictureClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapeKeydown);
    commentsCount = MAX_COMMENTS_COUNT;
  };

  var pictureCloseButton = bigPicture.querySelector('.cancel');

  var chooseBigPicture = function (collection, array) {
    collection.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        onOpenPictureClick(evt, index, array);
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
