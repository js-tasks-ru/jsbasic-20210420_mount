function camelize(str) {
  const strDetails = str.split('');
  let resultString = '',
        camelFlag = 0;

  let resultArray = strDetails.map( (item,i) => {
      if(item != '-'){
        if(camelFlag != 1){
          return item;
        }  
        camelFlag = 0;
      }
    else{
      camelFlag = 1;
      return strDetails[i + 1].toUpperCase();
    }
  })
  return resultArray.join('');
}
