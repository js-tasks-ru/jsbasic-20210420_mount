function sumSalary(salaries) {
  let summ = 0;
  for (const item in salaries){
    if ( isFinite(salaries[item]) ){
      summ = summ + salaries[item];
    }
  }
  return summ;
}
