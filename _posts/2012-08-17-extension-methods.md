---
layout      : post
title       : Extension methods
tags        : [.NET, C#, Extension method]
primarytag  : Extension method
intro       : Extension methods are a nice piece of syntactic sugar added to C# version 3.0 as part of .NET framework 3.5. They allow you to add methods to existing types, for example you can add a new method to the type <code>System.String</code> or <code>System.IO.File</code>.
---

To make an extension method, make the method static and put the `this` keyword in the front of the type you're extending as the first parameter, like so.

<!--prettify lang=csharp-->
    public static class ExtensionMethods
    {
        public static void RemoveWhitespace(this string text)
        {
            return text.Replace(" ", "")
                       .Replace("\t", "")
                       .Replace("\n", "");
        }
    }

And this is how you would call `string.RemoveWhitespace`

<!--prettify lang=csharp-->
    string text = " a string ";
    text.RemoveWhitespace();
    // text == "astring"

Really all that is happening here is you're using a different/nicer syntax to call regular method. Instead of calling some method `static string RemoveWhitespace(string text)`, you're calling it on the instance of string you want to modify.



## Extension properties

Extension properties are among the list of features being considered for future versions of C#. Until then we'll need to make do by implementing java-style getters and setters if required.
