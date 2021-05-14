function makeDiagonalRed(table) {
  let rowsCount = table.rows.length;
  
  for(let i = 0; i < table.rows.length; i++){
    let currentRow = table.rows[i].cells;
    for(let g = 0; g < currentRow.length; g++){
      table.rows[g].cells[g].style.background = 'red' 
    }
    break
  }
}