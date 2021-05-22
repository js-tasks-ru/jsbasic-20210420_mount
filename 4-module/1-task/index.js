function makeFriendsList(friends) {
  let friendsList = document.createElement('ul');
  let listItems = friends.map(person => 
    `<li>${person.firstName} ${person.lastName}</li>`
  ).join('');

  friendsList.innerHTML = listItems;
  return friendsList;
}