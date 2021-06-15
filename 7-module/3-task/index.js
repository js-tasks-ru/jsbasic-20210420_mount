export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this._sliderTemplate();
    this._makeSteps();
    this.state = this._setDefaultState();
    this._addEventListeners();
  }

  _sliderTemplate() {
    let elem = document.createElement('div');
    elem.classList.add('slider');
    elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
      </div>
    `;
    return elem;
  }
  _makeSteps() {
    let stepsContainer = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      stepsContainer.append(document.createElement('span'));
    }
  }
  _setDefaultState() {
    let percentState = (this.steps * this.value) / 100;
    this.elem.querySelector('.slider__thumb').style.left = `${percentState}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percentState}%`;
    this.elem.querySelector('.slider__steps span').classList.add('slider__step-active');
  }
  _setNewState(e) {
    let stepWidth = Math.round(this.elem.offsetWidth / (this.steps - 1));
    let stepsCollection = [...this.elem.querySelectorAll('.slider__steps span')];
    let currentStep = Math.round(e.layerX / stepWidth);
    let percentState = (currentStep / (this.steps - 1)) * 100;

    stepsCollection.forEach((el) => {
      el.classList.remove('slider__step-active');
    });
    stepsCollection[currentStep].classList.add('slider__step-active'); 

    this.elem.querySelector('.slider__thumb').style.left = `${percentState}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percentState}%`;
    this.elem.querySelector('.slider__value').textContent = currentStep;
    this._eventGenerator(currentStep);
  }

  _addEventListeners() {
    this.elem.addEventListener('click', (e) => {
      this._setNewState(e);
    });
  }
  _eventGenerator(currentState) {
    let customEvent = new CustomEvent('slider-change', {
      detail: currentState,
      bubbles: true 
    });
    this.elem.dispatchEvent(customEvent);
  } 
}
