function namify(users) {
  const newArray = [];
  users.forEach(element => {
    newArray.push(element.name)
  });
  return newArray;
}
