/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

 export default class UserTable {

  constructor(rows) {
    this.rows = rows;
    this.elem = this.initTable();
  }
  constructData(){
    let rowsList = this.rows.map(function(row){
        return `
              <tr>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.salary}</td>
                <td>${row.city}</td>
                <td><button>X</button></td>
              </tr>
        `
    }).join('');
    return rowsList;
  }

  initTable(){
    let table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            ${this.constructData()}
        </tbody>
    `
    this.removeRow(table);
    return table;
  }
  
  removeRow(table){
    table.onclick = function(e){
      let target = e.target;
      if (target.tagName != 'BUTTON') return;
      target.closest('tr').remove();
    }
  }
}
