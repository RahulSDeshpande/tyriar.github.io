---
layout      : post
title       : Hide your testing methods using InternalsVisibleTo
tags        : [C#, Testing]
primarytag  : C#
gpluspost   : 8C4DxAqyuuo
intro       : It is not necessary to expose all methods being tested as <code>public</code> when using an external test project. By using the assembly attribute <code>InternalsVisibleTo</code> and specifying the namespace of the "friend" assembly, the visibility of the methods can then be reduced to <code>internal</code>, hiding them from all other assemblies.
---

In the project's AssemblyInfo.cs

<!--prettify lang=csharp-->
    [assembly: InternalsVisibleTo("MyAssembly.Tests")]
