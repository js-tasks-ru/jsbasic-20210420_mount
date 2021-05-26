import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }
  sliderTemplate(){
    let carouselElem = document.createElement('div');
    carouselElem.classList.add("carousel");
    carouselElem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner"></div>
    `
    let carouselInner = carouselElem.querySelector('.carousel__inner');
    return {carouselElem, carouselInner};
  }
  makeSlidesList(carouselInner){
    let slidesArray = this.slides.map(function(slide){
      return `<div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>`
    }).join('');
    return slidesArray;
  }

  render(){
    let slider = this.sliderTemplate();
    slider.carouselInner.innerHTML = this.makeSlidesList(slider.carouselInner);

    setTimeout(() => {
      this.initCarousel(slider.carouselElem);
      this.clickGenerator(slider.carouselElem);
    }, 0);

    

    return slider.carouselElem;
  }

  initCarousel(carousel) {
    let data = {
        sliderBody: carousel.querySelector('.carousel__inner'),
        itemWidth: carousel.querySelector('.carousel__slide').offsetWidth,
        carouselPrev: carousel.querySelector('.carousel__arrow_left'),
        carouselNext: carousel.querySelector('.carousel__arrow_right'),
        slideCount: carousel.querySelectorAll('.carousel__slide').length,
        currentSlide: carousel.querySelectorAll('.carousel__slide').length,
    }
    data.carouselPrev.addEventListener('click', this.prevSlide.bind(this,data));
    data.carouselNext.addEventListener('click', this.nextSlide.bind(this,data));

    this.showArrows(data);
  }

  nextSlide(data){
    if( data.currentSlide > 0){
      data.currentSlide--;
      data.sliderBody.style.transform = `translateX(-${ (data.slideCount - data.currentSlide) * data.itemWidth}px)`
      this.showArrows(data);
    }
  }

  prevSlide(data){
      data.currentSlide++;
      data.sliderBody.style.transform = `translateX(-${ (data.slideCount - data.currentSlide) * data.itemWidth}px)`
      this.showArrows(data);
  }

  showArrows(data){
    if(data.currentSlide == data.slideCount){
      data.carouselPrev.style.display = 'none'
    }
    else{
      data.carouselPrev.style.display = 'flex';
    } 
    if(data.currentSlide == 1){
      data.carouselNext.style.display = 'none'
    }
    else{
      data.carouselNext.style.display = 'flex';
    }
  }

  clickGenerator(carousel){
    let corouselItems = carousel.querySelectorAll('.carousel__button');
    let classFlag = this;
    for(let item of corouselItems){
      item.onclick = function(event){
        let currentItem = this;
        let productId = this.closest('[data-id]').getAttribute('data-id');
        classFlag.userEvent(currentItem,productId)
      }
    }
  }

  userEvent(currentItem,productId){
    currentItem.addEventListener('click', function(e){
      main.dispatchEvent(
        new CustomEvent("product-add", { 
            detail: productId, 
            bubbles: true 
      }));
    })
  }
}
