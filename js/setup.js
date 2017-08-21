'use strict';

function getRandomData(array) {
  var rand = Math.random() * (array.length);
  rand = Math.floor(rand);
  return array[rand];
}

function createWizards(wizardsCount) {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizards = [];

  function getFullName() {
    var fullName = Math.random() > 0.5 ? getRandomData(FIRST_NAMES) + ' ' + getRandomData(SURNAMES) : getRandomData(SURNAMES) + ' ' + getRandomData(FIRST_NAMES);
    return fullName;
  }

  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = {
      name: getFullName(),
      coatColor: getRandomData(COAT_COLORS),
      eyesColor: getRandomData(EYE_COLORS)
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
