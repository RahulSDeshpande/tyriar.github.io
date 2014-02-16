(function() {
  var showText = "Show tags";
  var hideText = "Hide tags";
  var activeClass = "active";
  var button = document.querySelector('.toggle-button');
  var container = document.querySelector('.tag-toggle-container');
  button.addEventListener('click', function () {
    if (button.innerHTML === showText) {
      show();
    } else {
      button.innerHTML = showText;
      container.classList.remove(activeClass);
    }
  });

  // Show tags if there is no query string (?t=...)
  if (window.location.href.indexOf('?') === -1) {
    show();
  }

  function show() {
    button.innerHTML = hideText;
    container.classList.add(activeClass);
  }
})();