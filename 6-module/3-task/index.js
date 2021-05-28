import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }
  sliderTemplate(){
    let carouselBody = document.createElement('div');
    carouselBody.classList.add("carousel");
    carouselBody.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner"></div>
    `
    let carouselInner = carouselBody.querySelector('.carousel__inner');
    return {carouselBody, carouselInner};
  }
  
  makeSlidesList(){
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

    this.initCarousel(slider.carouselBody);
    this.addEventListeners(slider.carouselBody);

    return slider.carouselBody;
  }

  initCarousel(carousel) {
    let data = {
        sliderBody: carousel.querySelector('.carousel__inner'),
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
    let itemWidth = data.sliderBody.querySelector('.carousel__slide').offsetWidth;
    if( data.currentSlide > 0){
      data.currentSlide--;
      data.sliderBody.style.transform = `translateX(-${ (data.slideCount - data.currentSlide) * itemWidth}px)`
      this.showArrows(data);
    }
  }
  prevSlide(data){
      let itemWidth = data.sliderBody.querySelector('.carousel__slide').offsetWidth;
      data.currentSlide++;
      data.sliderBody.style.transform = `translateX(-${ (data.slideCount - data.currentSlide) * itemWidth}px)`
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

  addEventListeners(carousel){
    let corouselItems = carousel.querySelectorAll('.carousel__button');

    for(let item of corouselItems){
      item.addEventListener('click', this._clickGenerator.bind(this))
    }
  }

  _clickGenerator(event){
    let productId = event.target.closest('[data-id]').getAttribute('data-id');
    let generationEvent = new CustomEvent("product-add", { 
      detail: productId, 
      bubbles: true 
    })
    this.elem.dispatchEvent(generationEvent);
  }
}
