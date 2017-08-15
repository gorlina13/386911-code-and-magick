'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  function getMaxTime() {
    for (var i = 0; i < times.length; i++) {
      var time = Math.round(times[i]);
      if (time > max) {
        max = time;
      }
    }
  }

  getMaxTime();

  var histogramHeight = 150; // px;
  var step = histogramHeight / (max - 0); // px;

  var barWidth = 40; // px;
  var indent = 50; // px;
  var initialX = 155; // px;
  var initialY = 100; // px;
  var resultLineHeight = 20; // px;

  function getRandomColor() {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.round(Math.random() * 10) / 10 + ')';
  }

  ctx.textBaseline = 'hanging';

  function showResults() {
    for (var i = 0; i < times.length; i++) {
      ctx.fillText(Math.round(times[i]), initialX + i * (indent + barWidth), initialY + histogramHeight - Math.round(times[i]) * step - resultLineHeight);
      ctx.fillText(names[i], initialX + i * (indent + barWidth), initialY + histogramHeight);
    }
  }

  showResults();

  function showHistogram() {
    for (var i = 0; i < times.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        getRandomColor();
      }
      ctx.fillRect(initialX + i * (indent + barWidth), initialY + histogramHeight - Math.round(times[i]) * step, barWidth, Math.round(times[i]) * step);
    }
  }

  showHistogram();
};
