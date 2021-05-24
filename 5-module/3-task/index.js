function initCarousel() {
  const sliderBody = document.querySelector('.carousel__inner'),
        itemWidth = document.querySelector('.carousel__slide').offsetWidth,
        carouselPrev = document.querySelector('.carousel__arrow_left'),
        carouselNext = document.querySelector('.carousel__arrow_right');
  let   slideCount = document.querySelectorAll('.carousel__slide').length,
        currentSlide = slideCount;

  carouselPrev.addEventListener('click', prevSlide);
  carouselNext.addEventListener('click', nextSlide);
  
  function nextSlide(){
    if( currentSlide > 0){
      currentSlide--;
      sliderBody.style.transform = `translateX(-${ (slideCount - currentSlide) * itemWidth}px)`
      showArrows();
    }
  };
  function prevSlide(){
      currentSlide++;
      sliderBody.style.transform = `translateX(-${ (slideCount - currentSlide) * itemWidth}px)`
      showArrows();
  }
  function showArrows(){
    if(currentSlide == slideCount){
      carouselPrev.style.display = 'none'
    }
    else{
      carouselPrev.style.display = 'flex';
    } 
    if(currentSlide == 1){
      carouselNext.style.display = 'none'
    }
    else{
      carouselNext.style.display = 'flex';
    }
  }
  showArrows();
}
