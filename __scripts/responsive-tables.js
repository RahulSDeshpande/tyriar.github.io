(function () {
  var tables = document.querySelectorAll('table');
  for (var i = 0; i < tables.length; i++) {
    var table = tables[i];
    var parent = table.parentNode;
    parent.removeChild(table);
    var wrapper = document.createElement('div');
    wrapper.className = 'wide-table';
    wrapper.appendChild(table);
    parent.appendChild(wrapper);
  }
})();
