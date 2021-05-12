function camelize(str) {
  const strDetails = str.split('');
  let resultArray = [],
        resultString = '',
        camelFlag = 0;
  
  strDetails.forEach( (item,i) => {
     if(item != '-'){
       if(camelFlag != 1){
         resultArray.push(item);
       }  
       camelFlag = 0;
     }
    else{
      camelFlag = 1;
      resultArray.push(strDetails[i + 1].toUpperCase());
    }
  })
  return resultArray.join('');
}
