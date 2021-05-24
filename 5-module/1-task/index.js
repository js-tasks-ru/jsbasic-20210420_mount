function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  function hideThis(){
    this.hidden = true;
    this.removeEventListener('click',hideThis)
  }
  button.addEventListener('click',hideThis)
}
