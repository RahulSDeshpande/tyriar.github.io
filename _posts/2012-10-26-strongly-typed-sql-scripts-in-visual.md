---
layout      : post
title       : Strongly-typed SQL scripts in a Visual Studio project
tags        : [SQL, Visual Studio]
primarytag  : Visual Studio
intro       : One way that I've used to grab SQL from a file in the past is to simply include the SQL as a string in a resource file. This isn't really ideal though if you plan to edit or even view your SQL again.
---

You can actually attach any type of text file to a resource file, which works just like a regular strings resource file, but you get to store the files wherever you like and in whatever format you like. Allowing you to take advantage of the SQL syntax highlighting and validation within the text editor and also ease-of-use and type safety of resource files.

Just follow follow these steps:

1. Add your SQL file to your project
2. Create a resource file, preferably with a name that indicated that it contains files
3. Open the resource file and select 'Files' from the dropdown in the top-left corner (by default it opens on 'Strings')
4. Click add resource then find and select the SQL file
5. Save the resource file

You should now be able to access your SQL directly from the resource file in code.

{% include post-image.html class="center-aligned" alt="Intellisense" src="/images/2012/10/26/intellisense.png" %}

This works in Visual Studio 2012 and 2010, not so sure about earlier versions.
