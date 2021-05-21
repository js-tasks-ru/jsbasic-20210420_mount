function highlight(table) {
  for(let i = 1; i < table.rows.length; i++){
    for(let g = 0; g < table.rows[i].cells.length; g++){
      let dataAvl = table.rows[i].cells[3].getAttribute('data-available');
      let gender = table.rows[i].cells[2].textContent;
      let age = table.rows[i].cells[1].textContent;

      switch(dataAvl) {
        case 'true': 
          table.rows[i].classList.add("available")
          break;
        case 'false':
          table.rows[i].classList.add("unavailable")
          break;
        default: 
          table.rows[i].setAttribute('hidden','true');
          break;
      }
      switch(gender) {
        case 'm': 
          table.rows[i].classList.add("male")
          break;
        case 'f':
          table.rows[i].classList.add("female")
          break;
      }
      if(age < 18){
        table.rows[i].style.textDecoration = "line-through";
      }
    }
  }
}
