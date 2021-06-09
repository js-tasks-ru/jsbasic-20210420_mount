import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalElem = this.modalTemplate();
  }

  modalTemplate(){
    const modalElem = document.createElement('div');
    modalElem.classList.add('modal')
    modalElem.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
    `
    return modalElem;
  }

  setTitle(title = ''){
    this.modalElem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(content = ''){
    this.modalElem.querySelector('.modal__body').append(content);
  }

  open(){
    document.body.classList.add('is-modal-open')
    document.body.append(this.modalElem);
    this.addEventListeners();
  }
  addEventListeners(){
    let closeButton = this.modalElem.querySelector('.modal__close')
    closeButton.addEventListener('click', () => this.close(closeButton))
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.close(closeButton)
      }
    })
  }
  close(){
    document.body.classList.remove('is-modal-open')
    this.modalElem.remove();
  }
}