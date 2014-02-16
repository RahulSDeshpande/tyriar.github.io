(function () {
  var relatedPosts = document.querySelector('.related-posts ul');
  if (relatedPosts) {
    var children = Array.prototype.slice.call(relatedPosts.children);
    children.sort(
      function(a, b) {
        if (lowerText(a) < lowerText(b)) return -1;
        if (lowerText(a) > lowerText(b)) return 1;
        return 0;
      }
    );
    
    // Re-add the now sorted items
    for (var i = 0; i < children.length; i++) {
      relatedPosts.appendChild(children[i]);
    }
  }

  function lowerText(elem) {
    return (elem.innerText || elem.textContent).toLowerCase();
  }
})();