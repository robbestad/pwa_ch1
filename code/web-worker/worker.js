console.time('compute');

postMessage(function(n){
  var i = 0;
  while (++i < n * n) {}
  console.timeEnd('compute');
  return i;
}(123456));
