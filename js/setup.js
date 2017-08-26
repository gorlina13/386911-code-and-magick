'use strict';

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizardCoat = setup.querySelector('.wizard-coat');
var setupWizardEyes = setup.querySelector('.wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

function getRandomData(array) {
  var rand = Math.random() * (array.length);
  rand = Math.floor(rand);
  return array[rand];
}

function getRandomNames(wizardsCount) {
  var randomNames = [];
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  for (var i = 0; i < wizardsCount; i++) {
    var randomFirstName = getRandomData(firstNames);
    var randomLastName = getRandomData(lastNames);
    randomNames[i] = Math.random() > 0.5 ? randomFirstName + ' ' + randomLastName : randomLastName + ' ' + randomFirstName;
  }

  return randomNames;
}

function createWizards(wizardsCount) {
  var wizards = [];

  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = {
      name: getRandomNames(wizardsCount)[i],
      coatColor: getRandomData(COAT_COLORS),
      eyesColor: getRandomData(EYES_COLORS)
    };
  }
  return wizards;
}

function createWizardElement(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function appendWizardElements() {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < createWizards(4).length; i++) {
    fragment.appendChild(createWizardElement(createWizards(4)[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
}

appendWizardElements();

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!(evt.target === setupUserName)) {
      closePopup();
    }
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

function changeCoatColor() {
  setupWizardCoat.style.fill = getRandomData(COAT_COLORS);
}

function changeEyesColor() {
  setupWizardEyes.style.fill = getRandomData(EYES_COLORS);
}

function changeFireballColor() {
  setupFireballWrap.setAttribute('style', 'background: ' + getRandomData(FIREBALL_COLORS) + ';');
}

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupSubmit.addEventListener('click', closePopup);

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', changeCoatColor);

setupWizardEyes.addEventListener('click', changeEyesColor);

setupFireballWrap.addEventListener('click', changeFireballColor);
