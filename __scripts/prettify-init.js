(function () {
  var codeBlocks = document.querySelectorAll('pre code');
  for (var i = 0; i < codeBlocks.length; i++) {
    codeBlocks[i].parentNode.classList.add('prettyprint');
  }
  window.addEventListener("load", prettyPrint);
})();
