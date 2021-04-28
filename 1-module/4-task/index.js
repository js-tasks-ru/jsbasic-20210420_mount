function checkSpam(str) {
  if( str.match(/1XbeT/i) || str.match(/xxx/i) ){
    return true
  }
  return false;
}
