function showSalary(users, age) {
  let resultString = users
                          .filter(user => {return user.age <= age})
                          .map(user => {return `${user.name}, ${user.balance}\n`} )
                          .join('');
                          
  return resultString.substring(0, resultString.length - 1);
}
