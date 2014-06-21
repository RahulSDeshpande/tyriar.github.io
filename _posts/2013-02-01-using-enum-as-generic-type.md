---
layout      : post
title       : Using enum as a generic type
tags        : [C#, Generics]
primarytag  : C#
gpluspost   : EFa8R32hML1
intro       : This article introduces a method of defining a generic type for an <code>enum</code> for use in generic methods.
---

Unfortunately if you want to use an `enum` as a generic type, the obvious way of doing it doesn't work.

<!--prettify lang=csharp-->
    private void Method<TEnum>()
        where TEnum : enum

`enum` is treated as a special type and Microsoft haven't implemented this (yet). However, it is possible to use enums in generics. The MSDN article for [`Enum`][1] gives the following type definition for the class `Enum`.

<!--prettify lang=csharp-->
    [SerializableAttribute]
    [ComVisibleAttribute(true)]
    public abstract class Enum : ValueType,
     IComparable, IFormattable, IConvertible

This definition can be used to get `enum`s working as generic types by constraining the generic type to those of `Enum`. Note that we can not constrain to type `ValueType` due to a 'special class' rule in .NET, but we can use `struct` instead to get around this.

<!--prettify lang=csharp-->
    private void Method<TEnum>()
        where TEnum : struct, IConvertible, IComparable, IFormattable

The above still allows some errors to get through the compilation process, as we could specify the type of a `struct` that implements the `IComparable`, `IFormattable` and `IConvertable` interfaces. We can check the type of `TEnum` and confirm at runtime if it is an enum before doing any work.

<!--prettify lang=csharp-->
    private void Method<TEnum>()
        where TEnum : struct, IConvertible, IComparable, IFormattable
    {
        if (!typeof(TEnum).IsEnum)
        {
            throw new ArgumentException("TEnum must be an enum.");
        }

        // ...
    }

I'm not aware of a way around this that could guarantee 100% type-safety at runtime but it isn't really a big problem. After all, what are the chances that we are going to accidentally pass in a struct that implements the three interfaces.



## Further reading

- [MSDN - `System.Enum`][1]



[1]: http://msdn.microsoft.com/en-us/library/system.enum.aspx
