function getMinMax(str) {
  let destrArray = str.split(/[ ,]+/);
  let minVal = +destrArray[0];
  let maxVal = minVal;

  for (let i = 0; i < destrArray.length; i++) {
    let arrayElement = +destrArray[i];
    if (arrayElement < minVal) minVal = arrayElement;
    if (arrayElement > maxVal) maxVal = arrayElement;
  }
  return {min: minVal, max: maxVal};
}
