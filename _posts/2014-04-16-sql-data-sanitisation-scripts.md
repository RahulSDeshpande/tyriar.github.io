---
layout      : post
title       : SQL data sanitisation scripts
tags        : [My projects, SQL]
primarytag  : SQL
gpluspost   : JraBJ2RbCut
intro       : I created several SQL data sanitisation script templates that can be used to obfuscate data.
---

There are various scripts, each performing a transform to a particular data type. To use the scripts, replace the relevant table and column names and run them once. The names are fairly recognisable and all follow a similar naming convention like `TargetTable` and `TargetColumn`. 

The scripts that do not rely on `NEWID()` may work in non-T-SQL databases.

Check out the scripts on [GitHub Gist][1].



[1]: https://gist.github.com/Tyriar/d3635c6b6e32ac406623
