function sumSalary(salaries) {
  let summ = 0;
  for (item in salaries){
    if (typeof (salaries[item]) === 'number' && salaries[item] / salaries[item] ){
      summ = summ + salaries[item];
    }
  }
  return summ;
}
