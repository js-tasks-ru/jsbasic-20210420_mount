import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this._render();
  }
  _render(){
    let menu = this._menuTemplate();
    let elements = this._makeElementsLib(menu);

    this._makeMenuList(elements);
    this._addEventsListeners(elements);
    this._showArrows(elements);
    return menu;
  }

  _menuTemplate() {
    const menuElem = document.createElement('div');
    menuElem.classList.add('ribbon');
    menuElem.innerHTML =`
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `
    return menuElem;
  }
  _makeElementsLib(menu){
    let elementsList = {
      buttonLeft: menu.querySelector('.ribbon__arrow_left'),
      buttonRight: menu.querySelector('.ribbon__arrow_right'),
      menuList: menu.querySelector('.ribbon__inner'),
    }
    return elementsList;
  }

  _makeMenuList(menuElem){
    let menuList = this.categories.map(function(listItem) {
      return `
        <a href="#" class="ribbon__item" data-id="${listItem.id}">${listItem.name}</a>
      `;
    }).join('');
    menuElem.menuList.innerHTML = menuList;
  }

  _scrollRight(elements){
    elements.menuList.scrollBy(350, 0);
    elements.menuList.addEventListener('scroll', (event) => {
      this._showArrows(elements,event)
    });
    elements.buttonRight.removeEventListener('click', this._scrollRight);
  }

  _scrollLeft(elements){
    elements.menuList.scrollBy(-350, 0);
    elements.menuList.addEventListener('scroll', (event) => {
      this._showArrows(elements,event)
    });
    elements.buttonRight.removeEventListener('click', this._scrollLeft);
    elements.menuList.removeEventListener('scroll', this._showArrows);
  }

  _addEventsListeners(elements){
    elements.buttonRight.addEventListener('click', this._scrollRight.bind(this,elements))
    elements.buttonLeft.addEventListener('click', this._scrollLeft.bind(this,elements))
    elements.menuList.addEventListener('click', this._selectActiveCategory)
  }

  _showArrows(elements,event){
    if(elements.buttonLeft.scrollLeft < 1){
      elements.buttonLeft.classList.remove('ribbon__arrow_visible')
    }
    if(!event) return;

    if(event.target.scrollLeft < 1){
      elements.buttonLeft.classList.remove('ribbon__arrow_visible')
    }
    else{
      elements.buttonLeft.classList.add('ribbon__arrow_visible')
    }

    if(event.target.scrollWidth - event.target.scrollLeft - elements.menuList.clientWidth < 1){
      elements.buttonRight.classList.remove('ribbon__arrow_visible')
    }
    else{
      elements.buttonRight.classList.add('ribbon__arrow_visible')
    }
  }

  _selectActiveCategory(event){
    event.preventDefault;
    let category = event.target;
    if (category.tagName != 'A') return;
    let activeCategory = document.querySelector('.ribbon__item_active') || false;
    if(activeCategory){
      activeCategory.classList.remove('ribbon__item_active');
    }
    category.classList.add('ribbon__item_active')

    let customEvent = new CustomEvent('ribbon-select', {
      detail: category.getAttribute('data-id'),
      bubbles: true
    });
    this.offsetParent.dispatchEvent(customEvent);
  }
}
