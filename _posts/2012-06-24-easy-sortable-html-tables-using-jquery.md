---
layout      : post
title       : Easy sortable HTML tables using jQuery
tags        : [HTML, JavaScript, jQuery, My projects]
primarytag  : jQuery
intro       : I made a little jQuery script that makes it really easy to enable sorting on a HTML table.
---

## Features

- Really easy to set up
- Can sort on load if a header is specified otherwise assumes that the first column is already sorted
- Keyboard accessible
- Adds `title` attributes automatically to each `th`
- CSS arrow to signify ascending or descending



## How to use

1. Create a `table` using `tbody` tags for content and `th` for headers
2. Add `sortable` class to the table
3. (Optional) Specify a `th` to be sorted when the document is ready by adding the class `sorted` or `sorted desc` for descending



## Code

[View on GitHub][1]



[1]: https://github.com/Tyriar/sortable-table.js