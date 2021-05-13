function getMinMax(str) {
  let destrArray = str.split(/[ ,]+/);
  let minVal = +destrArray[0];
  let maxVal = minVal;

  for (let i = 0; i < destrArray.length; i++) {
    let e = +destrArray[i];
    if (e < minVal) minVal = e;
    if (e > maxVal) maxVal = e;
  }
  return {min: minVal, max: maxVal};
}
