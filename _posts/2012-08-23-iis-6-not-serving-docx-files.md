---
layout      : post
title       : IIS 6 not serving .docx files
tags        : [IIS, Windows]
primarytag  : Windows
intro       : I had a problem a while back where an IIS 6 server was not serving .docx extension files even though they were definitely there on the server. I immediately thought that the .docx MIME type must not be included in IIS 6 by default and it turns out that was the cause of the problem.
---

Here is how you fix it:

1. Open IIS 6
2. Right click computer and select properties
3. Select MIME types
4. Select New
5. Type in the extension '.docx' and the MIME type 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
6. Select OK and exit the properties screen
7. Refresh your site's application pool

This will happen with all of the Office 2007-specific file extensions so here is a list of their MIME types:

- .docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document
- .dotx - application/vnd.openxmlformats-officedocument.wordprocessingml.template
- .pptx - application/vnd.openxmlformats-officedocument.presentationml.presentation
- .potx - application/vnd.openxmlformats-officedocument.presentationml.template
- .ppsx - application/vnd.openxmlformats-officedocument.presentationml.slideshow
- .xlsx - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

- .xltx - application/vnd.openxmlformats-officedocument.spreadsheetml.template
- .sldx - application/vnd.openxmlformats-officedocument.presentationml.slide
- .xlam - application/vnd.ms-excel.addin.macroEnabled.12
- .xlsb - application/vnd.ms-excel.sheet.binary.macroEnabled.12