(function (tagNames) {
  var visiblePosts = [];
  var hiddenPosts = [];
  var filter = [];
  var tags = {}; // a map of tag names and the other tags that they be
  var fadedTags = [];

  initPosts();
  initTags();
  initTagNeighbours();
  initEvents();
  initVisiblePosts();

  function initTags() {
    var lastLetter = '';
    var menu = document.createElement('menu');
    for (var i = 0; i < tagNames.length; i++) {
      if (lastLetter.toUpperCase() !== tagNames[i][0].toUpperCase()) {
        // Create the letter heading
        lastLetter = tagNames[i][0].toUpperCase();
        if (!lastLetter.match(/[a-zA-Z]/g)) {
          lastLetter = '#';
        }
        var header = document.createElement('li');
        header.innerHTML = lastLetter;
        header.classList.add('letter-header');
        menu.appendChild(header);
      }
      var button = document.createElement('button');
      button.innerHTML = tagNames[i];
      tags[tagNames[i]] = {
        'elem': button,
        'neighbours': []
      };
      var li = document.createElement('li');
      li.appendChild(button);
      menu.appendChild(li);
    }

    var tagContainer = document.querySelector('.tag-container');
    tagContainer.classList.add('show-all');
    tagContainer.appendChild(menu);
  }

  function initTagNeighbours() {
    // TODO: Optimisation potential, binary search/insert
    // TODO: The perf of this may not be reasonable with all posts
    for (var i = 0; i < visiblePosts.length; i++) {
      for (var j = 0; j < visiblePosts[i].tags.length; j++) {
        for (var k = 0; k < visiblePosts[i].tags.length; k++) {
          if (j !== k) {
            if (tags[visiblePosts[i].tags[j]].neighbours.indexOf(visiblePosts[i].tags[k]) === -1) {
              tags[visiblePosts[i].tags[j]].neighbours.push(visiblePosts[i].tags[k]);
            }
          }
        }
      }
    }
    for (var i = 0; i < hiddenPosts.length; i++) {
      for (var j = 0; j < hiddenPosts[i].tags.length; j++) {
        for (var k = 0; k < hiddenPosts[i].tags.length; k++) {
          if (j !== k) {
            if (tags[hiddenPosts[i].tags[j]].neighbours.indexOf(hiddenPosts[i].tags[k]) === -1) {
              tags[hiddenPosts[i].tags[j]].neighbours.push(hiddenPosts[i].tags[k]);
            }
          }
        }
      }
    }
  }

  function initPosts() {
    var postLis = document.querySelectorAll('article');
    for (var i = 0; i < postLis.length; i++) {
      visiblePosts[i] = {
        'elem':  postLis[i],
        'tags': []
      };
      var postTags = postLis[i].querySelectorAll('.tags a');
      for (var j = 0; j < postTags.length; j++) {
        visiblePosts[i].tags[j] = postTags[j].innerHTML;
      }
    }
  }

  function initEvents() {
    // TODO: Use the global tags variable
    var tagsElements = document.querySelectorAll('.tag-container button');
    for (var i = 0; i < tagsElements.length; i++) {
      // TODO: Keyboard accessible?
      tagsElements[i].addEventListener('click', toggleTag);
    }
  }

  function initVisiblePosts() {
    // Check query string for any tags
    var tParam = getParameterByName('t');
    if (tParam) {
      var paramTags = tParam.split(',');
      for (var i = 0; i < paramTags.length; i++) {
        toggleTag.call(tags[paramTags[i]].elem);
      }
    }

    for (var i = 0; i < visiblePosts.length; i++) {
      visiblePosts[i].elem.classList.add('active');
    }
  }

  function toggleTag() {
    if (this.classList.contains('selected')) {
      this.classList.remove('selected');
      removeTag(this.innerHTML);
      reduceTagFade(this.innerHTML);
    } else {
      this.classList.add('selected');
      addTag(this.innerHTML);
      increaseTagFade(this.innerHTML);
    }
  }

  function removeTag(tag) {
    for (var i = 0; i < filter.length; i++) {
      if (filter[i] === tag) {
        filter.splice(i, 1);
        break;
      }
    }
    reduceFilter(tag);
  }

  function addTag(tag) {
    filter.push(tag);
    increaseFilter(tag);
  }

  function increaseFilter(tag) {
    for (var i = 0; i < visiblePosts.length; i++) {
      if (visiblePosts[i].tags.indexOf(tag) === -1) {
        hidePost(i--);
      }
    }
  }

  function reduceFilter(tag) {
    // Simple case, show all
    if (!filter.length) {
      // TODO: Can be optimized by bulk copying
      for (var i = 0; i < hiddenPosts.length; i++) {
        showPost(i--);
      }
      // Remove active from all posts
      var activeTags = document.querySelectorAll('.tag-container .active');
      for (var i = 0; i < activeTags.length; i++) {
        activeTags[i].classList.remove('active');
      }
      /*for (var i = 0; i < hiddenPosts.length; i++) {
        visiblePosts.push(hiddenPosts[i]);
      }
      hiddenPosts = [];*/
    }
    // If post contains tag, reevaluate
    for (var i = 0; i < hiddenPosts.length; i++) {
      // Only need to check if the post DIDN'T contain the removed tag
      if (hiddenPosts[i].tags.indexOf(tag) === -1) {
        // TODO: Potential for data structure optimisation?
        var visible = true;
        // Each tag in the filter must be on the post
        for (var k = 0; k < filter.length; k++) {
          if (hiddenPosts[i].tags.indexOf(filter[k]) === -1) {
            visible = false;
            break;
          }
        }
        if (visible) {
          showPost(i--);
        }
      }
    }
  }

  function showPost(i, keepActive) {
    hiddenPosts[i].elem.classList.add('active');
    visiblePosts.push(hiddenPosts[i]);
    hiddenPosts.splice(i, 1);
  }

  function hidePost(i) {
    visiblePosts[i].elem.classList.remove('active');
    hiddenPosts.push(visiblePosts[i]);
    visiblePosts.splice(i, 1);
  }

  function increaseTagFade(tag) {
    if (document.querySelector('.tag-container').classList.contains('show-all')) {
      document.querySelector('.tag-container').classList.remove('show-all');
    }
    if (filter.length === 1) {
      // if it was the first activated tag, highlight all neighbours
      for (var i = 0; i < tags[tag].neighbours.length; i++) {
        tags[tags[tag].neighbours[i]].elem.classList.add('active');
      }
    } else {
      // only proceed if the new tag is a neighbour of the previous tags (ie. it's inactive)
      var isNeighbour = true;
      for (var i = 0; i < filter.length; i++) {
        if (filter[i] !== tag && tags[filter[i]].neighbours.indexOf(tag) === -1) {
          isNeighbour = false;
        }
      }
      if (isNeighbour) {
        // deactivate any active tags that are not neighbours of the new tag
        var activeTags = document.querySelectorAll('.tag-container .active:not(.selected)');
        // Need to check posts here, not tags
        for (var i = 0; i < activeTags.length; i++) {
          if (tags[tag].neighbours.indexOf(activeTags[i].innerHTML) === -1) {
            activeTags[i].classList.remove('active');
          }
        }


        // Check all visible posts for the tag, if it's not present, remove .active
        for (var i = 0; i < activeTags.length; i++) {
          var found = false
          for (var j = 0; j < visiblePosts.length; j++) {
            if (visiblePosts[j].tags.indexOf(activeTags[i].innerHTML) !== -1) {
              // It was found, exit
              found = true;
              break;
            }
          }
          if (!found) {
              activeTags[i].classList.remove('active');
          }
        }
      } else {
        // hide all non-selected active tags
        // TODO: Could be merged with the above section, could make complex though
        var activeTags = document.querySelectorAll('.tag-container .active:not(.selected)');
        for (var i = 0; i < activeTags.length; i++) {
          activeTags[i].classList.remove('active');
        }
      }
    }
    tags[tag].elem.classList.add('active');
  }

  function reduceTagFade(tag) {
    if (!filter.length) {
      document.querySelector('.tag-container').classList.add('show-all');
      for (var i = 0; i < tags.length; i++) {
        tags[i].elem.classList.remove('active');
      }
      return;
    }
    // check :not(.active) tags
    if (areFilterTagsNeighbours()) {
      var inactiveTags = document.querySelectorAll('.tag-container button:not(.active)');
      for (var i = 0; i < inactiveTags.length; i++) {
        // if they do not contain the tag
        // re-evaluate them - check if the tag is in every filter tag neighbour set
        evaluateTagFadeState(inactiveTags[i]);
      }
    }
    // if the removed tag is not a neighbour of all filter tags, remove active
    var faded = false;
    for (var i = 0; i < filter.length; i++) {
      for (var j = 0; j < tags[filter[i]].neighbours.length; j++) {
        if (tags[filter[i]].neighbours.indexOf(tag) === -1) {
          faded = true;
          break;
        }
      }
    }
    if (faded) {
        tags[tag].elem.classList.remove('active');
    }

    // When unchecking, it's still active, evaluate individually
    evaluateTagFadeState(tags[tag].elem);
  }

  function evaluateTagFadeState(elem) {
    // Check all visible posts, if the tag is present in at least one then add
    // the active class
    var found = false;
    for (var i = 0; i < visiblePosts.length; i++) {
      if (visiblePosts[i].tags.indexOf(elem.innerHTML) !== -1) {
        found = true;
        break;
      }
    }
    if (found) {
      elem.classList.add('active');
    }
  }

  function areFilterTagsNeighbours() {
    for (var i = 0; i < filter.length; i++) {
      for (var j = i + 1; j < filter.length; j++) {
        if (tags[filter[i]].neighbours.indexOf(filter[j]) === -1 ||
            tags[filter[j]].neighbours.indexOf(filter[i]) === -1) {
          return false;
        }
      }
    }
    return true;
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  // TODO: update query string in URL when a different tag is selected
})(tagNames);
