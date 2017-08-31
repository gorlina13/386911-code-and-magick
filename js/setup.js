'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

  function getRandomNames(wizardsCount) {
    var randomNames = [];
    var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

    for (var i = 0; i < wizardsCount; i++) {
      var randomFirstName = window.util.getRandomData(firstNames);
      var randomLastName = window.util.getRandomData(lastNames);
      randomNames[i] = Math.random() > 0.5 ? randomFirstName + ' ' + randomLastName : randomLastName + ' ' + randomFirstName;
    }

    return randomNames;
  }

  function createWizards(wizardsCount) {
    var wizards = [];

    for (var i = 0; i < wizardsCount; i++) {
      wizards[i] = {
        name: getRandomNames(wizardsCount)[i],
        coatColor: window.util.getRandomData(COAT_COLORS),
        eyesColor: window.util.getRandomData(EYES_COLORS)
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

  function changeCoatColor(color) {
    setupWizardCoat.style.fill = color;
  }

  function changeEyesColor(color) {
    setupWizardEyes.style.fill = color;
  }

  function changeFireballColor(color) {
    setupFireballWrap.style.backgroundColor = color;
  }

  window.colorize(setupWizardCoat, COAT_COLORS, changeCoatColor);

  window.colorize(setupWizardEyes, EYES_COLORS, changeEyesColor);

  window.colorize(setupFireballWrap, FIREBALL_COLORS, changeFireballColor);
})();
