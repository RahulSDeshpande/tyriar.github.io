---
layout      : post
title       : Func&lt;&gt; and Action&lt;&gt; basics in C#
tags        : [.NET, ASP.NET, MVC, C#, Generics]
primarytag  : Generics
intro       : If you've been coding in C# for a while you may have noticed the <code>Func&lt;&gt;</code> parameter type presented in several places, particularly LINQ which uses it extensively. You may know how to use it but have you ever thought about what it is exactly and how to go about using it in your own functions?
---



## What is `Func`

`Func<>` is a shorthand for a delegate that takes 0 or more parameters and returns a result. The leading types provided are the parameters and the last type is always the return type. For example, the following takes an `object` as the first parameter, an `int` as the second parameter and returns a `string`.

<!--prettify lang=csharp-->
    Func<object, int, string> function;

Here is the actual formal definition of the `Func<T, TResult>` delegate, they are defined separately for each number of parameters from 0 to 16.

<!--prettify lang=csharp-->
    public delegate TResult Func<in T, out TResult>(
        T arg
    )

Here is a non-generic version of what it is like if you have difficulty reading generic code.

<!--prettify lang=csharp-->
    delegate ReturnType Function(ParamType1 param1, ParamType2 param2);



## Defining a `Func`

You can assign a `Func<>` type by providing a lambda expression, which is C#'s version of anonymous functions. Here is the most simple example of a lambda expression, returning the only parameter on the `Func<>`.

<!--prettify lang=csharp-->
    x => x

The left-hand side defines the alias for the parameter(s) and the right hand side specifies what you do with them to return the desired result. Here we are calling the first parameter 'x' and returning x so the return type must be that of the parameter of a base class of it.

Here is a slightly more complex example, ordering a list using LINQ by a property on the parameter.

<!--prettify lang=csharp-->
    private IEnumerable<person> people;

    public IOrderedEnumerable<person> GetOrderedPeople
    {
        get
        {
            return people.OrderByDescending(x => x.Age)
                         .ThenBy(x => x.Name);
        }
    }

Multiple parameters are specified like so


<!--prettify lang=csharp-->
    (x, e) => e.Equals(x)



## Using `Func`

Here is a pretty good example of one way to use`Func<>` in your own functions effectively. The following function is an extension method on `HtmlHelper<dynamic>` (ASP.NET MVC) that output a select list using a list of 'something'.

<!--prettify lang=csharp-->
    public static HtmlString CustomSelectList<T>(
        this HtmlHelper<dynamic> html,
        string selectId,
        IEnumerable<T> list,
        Func<T, string> getName,
        Func<T, string> getValue)
    {
        StringBuilder builder = new StringBuilder();
        builder.AppendFormat("<select id=\"{0}\">", selectId);
        foreach (T item in list)
        {
            builder.AppendFormat("<option value=\"{0}\">{1}</option>",
                getValue(item),
                getName(item));
        }
        builder.Append("</select>");
        return new HtmlString(builder.ToString());
    }

Which would be used like this within an MVC view.

<!--prettify lang=csharp-->
    @(Html.CustomSelectList<Person>(id, people, x => x.FullName, x => x.Id))



## Action

The `Action<>` types are simply `Func<>` with no return type.

<!--prettify lang=csharp-->
    Action<string> output = x => Console.WriteLine(x);