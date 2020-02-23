'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadInput = window.form.uploadFile;
  var preview = window.form.image;
  var filtersPreview = window.form.filtersPreview;

  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        // Этот цикл нельзя сделать через forEach, так как Линтер ругается, что слишком много колбэков и допускается только 3.
        for (var i = 0; i < filtersPreview.length; i++) {
          filtersPreview[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
        // -------------------------------------------------------------------------------------------------------------------
      });
      reader.readAsDataURL(file);
    }
  });
})();
