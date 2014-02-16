---
layout      : post
title       : ASP.NET MVC inline functions in a razor view
tags        : [.NET, ASP.NET, MVC, C#, Razor, Umbraco]
primarytag  : ASP.NET
intro       : Here is the syntax for defining inline functions in an ASP.NET MVC razor view. I found this particularly useful when working with Umbraco as the regular alternatives like extension methods and helper classes aren't available.
---

<!--prettify lang=csharp-->
    @functions
    {
        HtmlString PrintSomething()
        {
            return new HtmlString("Hello World");
        }
    }

Returning a `HtmlString` object will allow you to print to the screen.

<!--prettify lang=html-->
    <div>@PrintSomething()</div>
