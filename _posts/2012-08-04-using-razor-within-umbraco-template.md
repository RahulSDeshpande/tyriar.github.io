---
layout      : post
title       : Using razor within an Umbraco template
tags        : [Razor, Umbraco]
primarytag  : Umbraco
intro       : Normally you restrict use of razor to the scripting folder in the developer tab and expose them via macros, but you can also use them inside a template by creating an inline macro.
---

<!--prettify lang=html-->
    <umbraco:Macro runat="server" Language="razor">
    @{
        // insert razor here
        var href = "index.htm";
        <a href="@href">Home</a>
    }
    </umbraco:Macro>

This should only be done for small one-offs where you are unlikely to need to reuse the functionality, such as loading in the page title. Keep anything greater than that in the scripting folder.
