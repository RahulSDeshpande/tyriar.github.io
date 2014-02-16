(function (home) {
  var items = [];
  var searchTerm;

  init();

  function init() {
    searchTerm = document.querySelector('#search-term');
    document.querySelector('#search-form').addEventListener('submit', search);
    window.addEventListener('load', loadLabels);
  }

  function search(e) {
    var q = searchTerm.value.toLowerCase();
    if (q !== '') {
      var found = false;
      var label;
      for (var i = 0; i < items.length; i++) {
        label = items[i]
        found = label.toLowerCase() == q;
        if (found) break;
      }
      if (found)
        window.location = home + "/p/explore.html?t=" + encodeURIComponent(label);
      else
        window.location = "http://www.google.com/search?q=site:" + window.location.hostname + "+" + encodeURIComponent(q);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function loadLabels() {
    var options = document.querySelectorAll('#label-list option');
    for (var i = 0; i < options.length; i++) {
      items.push(options[i].getAttribute('value'));
    }
  }
})(home);
