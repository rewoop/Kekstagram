'use strict';

var getPhotoDescription = function (amount) {
  var arrPhotoDescription = [
    {
      url: 'stroka',
      description: 'stroka',
      likes: 'stroka',
      comments: 'stroka'
    }
  ];
  for (var i = 0; i < amount; i++) {
    arrPhotoDescription[i];
  };
  return arrPhotoDescription;
};

console.log(getPhotoDescription(25));
