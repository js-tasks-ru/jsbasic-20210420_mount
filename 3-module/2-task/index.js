function filterRange(arr, a, b) {
  let rangeArr = arr.filter(i => { return i >=a && i <= b; });
  return rangeArr;
}