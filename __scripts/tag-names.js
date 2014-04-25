// Ideally tags would come from the below so that we can be certain that all tags
// are present. However there is no unique filter for Jekyll arrays right now
// and using the below takes up 1/3 of the index's pageweight.
// So caution must be taken when adding tags (which I think I'm fairly good at
// anyway, rarely adding tags)
// tag-search.js will actually crash if a post has a tag that isn't contained in
// tagNames.

//var tagNames = ["{{ site.posts | map: 'tags' | sort | join: '","'}}"];
// We need to sort again because the liquid sort is case sensitive (jQuery)
/*tagNames.sort(
  function(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  }
);*/

var tagNames = ["ASP.NET MVC","Accessibility","Algorithm","Amazon","Android","Artificial intelligence","Bash","Behavioural design pattern","Blogging","Browser","C#","CSS","Canvas","Chrome","Computer science","Concurrency","Creational design pattern","Dart","Data structure","Debugging","Design","Design pattern","Entity framework","Extension method","Firefox","Generics","Git","GitHub","Google","Graph","HTML","Hotkey","IIS","Internet Explorer","Interview questions","Java","JavaScript","Jekyll","jQuery","Knockout","LESS","Life","LINQ","Markdown","Math","Microsoft","My projects","Natural language","Opera","Optimisation","Pathfinding","Prettyprint","Productivity","Razor","Reflection","Responsive web design","Sass","SEO","SQL","SVG","Safari","Search engine","Searching","Software engineering","Sorting","Stack Exchange","Structural design pattern","Stylus","Sublime Text","Testing","Tree","UML","Umbraco","Unicode","Visual Studio","Windows","XML"];
(function () {
  var tagList = document.createElement('datalist');
  tagList.id = "label-list";
  var cur = 0;
  for (var i = 0; i < tagNames.length; i++) {
    if (i === 0 || tagNames[i] !== tagNames[i-1]) {
      tagNames[cur++] = tagNames[i];
      var opt = document.createElement('option');
      opt.setAttribute('value', tagNames[i]);
      tagList.appendChild(opt);
    }
  }
  tagNames.splice(cur);
  document.body.appendChild(tagList);
  document.querySelector('#search-term').setAttribute('list', 'label-list');
})();
