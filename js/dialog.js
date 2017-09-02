'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');
  var setupUserName = setup.querySelector('.setup-user-name');

  function onPopupEscPress(evt) {
    if (!(evt.target === setupUserName)) {
      window.util.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupSubmit.addEventListener('click', closePopup);

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var dialogHandle = setup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /* В задании сказано: При повторном открытии/закрытии диалога,
    положение диалога должно сбрасываться на изначальное*/

    // Получаю координаты диалога относительно документа.
    // var dialogCoords = window.util.getCoords(setup);
    /* А как их передать отсюда? И куда - в функцию openPopup?
    Она находится в этом же модуле - выше.*/

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      dialogHandle.querySelector('input').classList.remove('hidden');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    function hideAvatarInput() {
      dialogHandle.querySelector('input').classList.add('hidden');
    }
    // Как заставить диалог перетаскиваться именно за .setup-user-pic?
    /* Пытаюсь узнать, был ли mousedown на элементе .setup-user-pic,
    двумя способами:

    1)таким:*/
    /* var setupUserPic = target.closest('.setup-user-pic');
    if (!setupUserPic) return;*/

    // 2)либо таким:
    /* var target = event.target;
    while (target != dialogHandle) {
      if (target.tagName == 'IMG') {
        setTimeout(hideAvatarInput, 1000);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return;
      }
      target = target.parentNode;
    }*/

    // Но оба здесь не работают!


    setTimeout(hideAvatarInput, 1000);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.closest('.setup-artifacts-shop')) {
      draggedItem = evt.target.cloneNode(true);
    } else {
      draggedItem = evt.target;
    }

    if (evt.target.tagName.toLowerCase() === 'img') {
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style = 'outline: 2px dashed red;';
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
    if (evt.target.nodeName.toLowerCase() === 'div' && !evt.target.hasChildNodes()) {
      evt.target.appendChild(draggedItem);
    }
    artifactsElement.style = 'outline: none';
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.nodeName.toLowerCase() === 'img' || evt.target.hasChildNodes()) {
      evt.target.style.backgroundColor = 'red';
    } else {
      evt.target.style.backgroundColor = 'yellow';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  /* В этом обработчике снятие обводки не работает,
  если происходит клонирование звездочек.
  Поэтому снимаю обводку в функции на обработчике дропа.
  (Если не клонировать элементы, а просто переносить - то работает).*/
  /* artifactsElement.addEventListener('dragend', function (evt) {
    artifactsElement.style = 'outline: none';
  });*/
})();
