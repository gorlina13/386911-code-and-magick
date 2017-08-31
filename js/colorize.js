'use strict';

(function () {
  window.colorize = function (element, colorsArray, onColorChange) {
    element.addEventListener('click', function () {
      var color = window.util.getRandomData(colorsArray);
      onColorChange(color);
    });
  };
})();
