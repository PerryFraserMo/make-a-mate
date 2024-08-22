import { userData } from './userData.js';

export const screenEle = document.querySelector("#screen");

export const entryDisplayEle = document.querySelector("#entry");
export const dressingDisplayEle = document.querySelector("#dressing");
export const attributesDisplayEle = document.querySelector("#attributes");
export const scenarioDisplayEle = document.querySelector("#scenario");
export const dialogDisplayEle = document.querySelector("#dialog");
export const resultDisplayEle = document.querySelector("#result");

export const mateContainerEle = document.querySelector("#mateContainer");
export const phoneContainerEle = document.querySelector("#phoneContainer");

let currentDisplayEle;

export function loadFromUserData() {
  // populate the thingie.
}

function enterEntry() {
  loadFromUserData();

  transitionToDisplayEle(entryDisplayEle);
}

export function transitionToDisplayEle(targetDisplayEle) {
  if (currentDisplayEle) {
    currentDisplayEle.classList.remove("focused");
    currentDisplayEle.classList.add("finished");

    currentDisplayEle.addEventListener("transitionend", (event) => {
      event.target.classList.remove("finished");
    }, {once: true})
  }
  targetDisplayEle.classList.add("focused");
  currentDisplayEle = targetDisplayEle;

  screenEle.setAttribute("focusedDisplay", targetDisplayEle.getAttribute("id"));
}

function initializeEntry() {
  const doneButtonEle = entryDisplayEle.querySelector("#entryDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(dressingDisplayEle);
  });
}
function initializeDressing() {
  const doneButtonEle = dressingDisplayEle.querySelector("#dressingDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(attributesDisplayEle);
  });
}
function initializeAttributes() {
  const doneButtonEle = attributesDisplayEle.querySelector("#attributesDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(scenarioDisplayEle);
  });
}
function initializeScenario() {
  const doneButtonEle = scenarioDisplayEle.querySelector("#scenarioDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(dialogDisplayEle);
  });
}
function initializeDialog() {
  const doneButtonEle = dialogDisplayEle.querySelector("#dialogDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(resultDisplayEle);
  });
}
function initializeResult() {
  const doneButtonEle = resultDisplayEle.querySelector("#resultDone");

  doneButtonEle.addEventListener("click", () => {
    transitionToDisplayEle(entryDisplayEle);
  });
}

function initializeMate() {
  // dressing
  const mateOptionContainerEles = [...mateContainerEle.querySelectorAll("mateOptionContainer")];

  const mateOptionControlTemplateEle = document.querySelector("template#mateOptionControlContainer").content;

  for (const mateOptionContainerEle of mateOptionContainerEles) {
    const optionId = mateOptionContainerEle.getAttribute("id");
    const mateOptionEles = [...mateOptionContainerEle.querySelectorAll("mateOption")];

    const mateOptionControlCloneEle = mateOptionControlTemplateEle.cloneNode(true);

    // initialize the controller
    const leftArrowEle = mateOptionControlCloneEle.querySelector("leftArrow");
    const rightArrowEle = mateOptionControlCloneEle.querySelector("rightArrow");

    const selectMateOption = (index) => {
      const wrappedIndex = index % mateOptionEles.length;

      mateOptionContainerEle.setAttribute("selectedIndex", wrappedIndex);

      userData.mate.appearenceSelections[optionId] = wrappedIndex;
    };

    leftArrowEle.addEventListener("click", (e) => {
      const currentSelectedOptionIndex = mateOptionContainerEle.getAttribute("selectedIndex");

      if (currentSelectedOptionIndex === undefined) {
        // select the first one.
        selectMateOption(0);
        return;
      }

      const asNumber = parseInt(currentSelectedOptionIndex);
      
      selectMateOption(asNumber - 1);
    });
    rightArrowEle.addEventListener("click", (e) => {
      const currentSelectedOptionIndex = mateOptionContainerEle.getAttribute("selectedIndex");

      if (currentSelectedOptionIndex === undefined) {
        // select the first one.
        selectMateOption(0);
        return;
      }

      const asNumber = parseInt(currentSelectedOptionIndex);
      
      selectMateOption(asNumber + 1);
    });

    mateOptionContainerEle.appendChild(mateOptionControlCloneEle);
  };
}
function initializePhone() {

}

export function initialize() {
  initializeMate();
  initializePhone();

  initializeEntry();
  initializeDressing();
  initializeAttributes();
  initializeScenario();
  initializeDialog();
  initializeResult();

  enterEntry();
}