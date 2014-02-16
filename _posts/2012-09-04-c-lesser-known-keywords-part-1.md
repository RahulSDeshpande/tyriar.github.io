---
layout      : post
title       : C# lesser known keywords part 1
tags        : [.NET, C#]
primarytag  : C#
intro       : This post will give a brief overview of some of the lesser known keywords in C# (as-implicit). I'll cover more in later posts.
---



## `as`

The `as` keyword casts the expression on the left to the type on the right if the type matches. If the type on the left is not of the type on the right then `null` is returned. The following two expressions are equivalent ([via MSDN][1]).

<!--prettify lang=csharp-->
    expression as Type
    expression is Type ? (Type)expression : (Type)null



## `checked`

The `checked` keyword explicitly enables overflow checking. Normally an expression that contains only constant values will cause overflow exceptions

<!--prettify lang=csharp-->
    int max = int.MaxValue;

    // Outputs 2147483647
    Console.WriteLine(max);

    // Outputs -2147483648
    Console.WriteLine(max + 1);

    // OverflowException
    Console.WriteLine(checked(max + 1));



## `continue`

The `continue` keyword is similar to `break`. When used inside a loop it skips the remainder of statements in the loop and continues the next iteration. The following code writes 0 and 2 to the console.

<!--prettify lang=csharp-->
    for (int i = 0; i < 3; i++)
    {
        if (i == 1)
            continue;
        Console.WriteLine(i);
    }



## `default`

In addition to being the used in a `switch` statement defining what happens when none of the cases are true, `default` can also be used in generic code. It returns the default value for the type supplied which is `null` for a reference type and 0 for a numeric value type.

<!--prettify lang=csharp-->
    string text = default(string); // null
    float number = default(float); // 0f



## `delegate`

A `delegate` is a type-safe function pointer, allowing storage of a function in a variable.

<!--prettify lang=csharp-->
    delegate int ExampleDelegate(int, string);

    private int F(int a, string b);

    public void TestDelegate()
    {
        ExampleDelegate exampleDelegate = F;
        exampleDelegate(10, "test");
    }



## `event`

The `event` keyword defines an event which acts similar to a method, only you can assign one or more event handlers to the event to run when it is called.

<!--prettify lang=csharp-->
    class Program
    {
        static void Main(string[] args)
        {
            var window = new Window();
            window.OnLoadEvent += new Window.LoadEventHandler(window_OnLoadEvent);
            window.Load();
        }

        static void window_OnLoadEvent(object sender, LoadEventArgs e)
        {
            Console.WriteLine(e.Text);
        }
    }

    public class Window
    {
        public delegate void LoadEventHandler(object sender,
                                              LoadEventArgs e);

        public event LoadEventHandler OnLoadEvent;

        public void Load()
        {
            if (OnLoadEvent != null)
            {
                var args = new LoadEventArgs { Text = "Loading..." }
                OnLoadEvent(this, args);
            }
        }
    }

    public class LoadEventArgs
    {
        public string Text { get; set; }
    }



## `explicit`

The `explicit` keyword allows the creation of a conversion operator used with an explicit casting from one type to another. You can place both to and from conversion methods within the enclosing type.

<!--prettify lang=csharp-->
    class Kilogram
    {
        public double Amount { get; set; }

        public static explicit operator Kilogram(Pound pound)
        {
            return new Kilogram()
            {
                Amount = pound.Amount / 2.20462262;
            };
        }
    }

    class Pound
    {
        public double Amount { get; set; }

        public static explicit operator Pound(Kilogram kilogram)
        {
            return new Pound()
            {
                Amount = kilogram.Amount / 2.20462262&nbsp;
            };
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // Usage example
            Kilogram k = new Kilogram();
            k.Amount = 2;
            Pound p = (Pound)k;
            // p.Amount == 0.90718474076075661
        }
    }



## `extern`

The `extern` keyword enables the use of methods that are implemented externally, such as from a dll file. The following example is from [MSDN][2].

<!--prettify lang=csharp-->
    [DllImport("avifil32.dll")]
    private static extern void AVIFileInit();



## `finally`

The `finally` keyword is normally used to clean up resources allocated in a `try` block, for example closing a file if an exception occurs while it is open. The statements in the `finally` block will be run in all cases with the only exception being sometimes it won't depending on your computer setup if you are using a `try finally`, the solution being to add a `catch` to the `try finally` statement.

<!--prettify lang=csharp-->
    StreamReader file = new StreamReader(path);

    try
    {
        // Read the file
    }
    catch (IOException ex)
    {
        // Report the error
    }
    finally
    {
        if (file != null)
        {
            file.Close();
        }
    }



## `fixed`

The `fixed` keyword can only be used in the `unsafe` context and prevents the garbage collector relocating a variable's memory which could cause a pointer to point to the wrong location. A common usage of `fixed` is to manipulate the pixels in a `Bitmap` due to how slow the regular GetPixel and SetPixel methods are.

<!--prettify lang=csharp-->
    double[] array = { 0.1, 0.2, 0.3, 0.4 };
    fixed (double* p = array)
    {
        // Do something
    }



## `goto`

Ah `goto`... Why are you still here?

<!--prettify lang=csharp-->
    switch (3)
    {
        case 1:
            Console.WriteLine("1");
            break;
        case 3:
            Console.WriteLine("3");
            goto case 1;
    }

<!--prettify lang=csharp-->
    goto end;
    // This will be skipped
    end:



## `implicit`

The `implicit` keyword allows the creation of a conversion operator used with an casting from one type to another, an explicit cast is not required. You can place both to and from conversion methods within the enclosing type.

<!--prettify lang=csharp-->
    class Kilogram
    {
        public double Amount { get; set; }

        public static implicit operator double(Kilogram kilogram)
        {
            return kilogram.Amount;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // Usage example
            Kilogram k = new Kilogram();
            k.Amount = 2;
            double d = k;
            // d == 2.0
        }
    }



[1]: http://msdn.microsoft.com/en-us/library/cscsdfbt(v=vs.110).aspx
[2]: http://msdn.microsoft.com/en-us/library/e59b22c5.aspx