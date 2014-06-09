(function () {
  // Replace '{url}' in share icons with current page's URL
  var links = document.querySelectorAll('.share-icons a');
  for (var i = 0; i < links.length; i++) {
    links[i].href = links[i].href.replace('{url}', window.location.href);
  }
})();
