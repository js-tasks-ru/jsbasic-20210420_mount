function showSalary(users, age) {
  let resultString = '';
  users.forEach(item =>{
    if(item.age <= age){
      let thisName = item.name,
            thisBalance = item.balance;
      resultString += `${thisName}, ${thisBalance}\n`
    }
  })
  return resultString.substring(0, resultString.length - 1)
}
