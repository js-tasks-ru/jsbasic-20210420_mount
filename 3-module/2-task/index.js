function filterRange(arr, a, b) {
  let rangeArr = arr.filter(function(i) {
    return i >=a && i <= b;
  });
  return rangeArr;
}
