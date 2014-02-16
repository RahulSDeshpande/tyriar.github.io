---
layout      : post
title       : Use razor comments in MVC views not HTML comments
tags        : [.NET, ASP.NET, MVC, C#, Debugging, Razor]
primarytag  : ASP.NET
intro       : Make sure for code documentation you use the razor-style comments in your ASP.NET MVC views, not HTML-style comments. Regular HTML comments will be sent to the client which would increase the page size and expose unnecessary implementation details to the end-user, razor comments are kept server-side.
---

**Good**

<!--prettify lang=csharp-->
    @* Comment *@

**Bad**

<!--prettify lang=html-->
    <!-- Comment -->
