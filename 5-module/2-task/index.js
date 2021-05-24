function toggleText() {
  let button = document.querySelector('.toggle-text-button'),
      text = document.getElementById('text');  
  const hidenToggle = function(){
    text.toggleAttribute('hidden')
  }
  button.addEventListener('click',hidenToggle);
}
