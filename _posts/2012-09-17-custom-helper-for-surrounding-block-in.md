---
layout      : post
title       : Custom helper for surrounding a block in markup with MVC
tags        : [ASP.NET MVC, C#, Extension method, HTML]
primarytag  : ASP.NET
intro       : This article illustrates how to create a custom helper for ASP.NET MVC to use in views that surrounds a block of markup.
---

You may have seen or used the following code in your MVC applications:

<!--prettify lang=csharp-->
    @using (Html.BeginForm())
    {
        // ...
    }

It surrounds the markup inside the block with a `<form>` tag and includes attributes based on what is passed through the parameter list. The way it works is `HtmlHelper.BeginForm()` returns a `MvcForm` object which on creation uses `HtmlHelper` to write markup to the page. When the using block comes to an end the `Dispose` method on `MvcForm` is used to output the closing tag.

I found myself needing to do this exact thing, so I downloaded the MVC source and had a look at how it all worked. The specific use case I needed it for was to output a fancy box around a block of markup, the box had a header and contained several tags before the content. Unfortunately I couldn't place it in the layout as there could be multiple of them on a single page.

Here is an example of how to create a custom helper, this once surrounds the block in a simple div, take particular note of the `Begin()` and `End()` methods.

<!--prettify lang=csharp-->
    public class MvcDiv : IDisposable
    {
        private bool _disposed;
        private readonly FormContext _originalFormContext;
        private readonly ViewContext _viewContext;
        private readonly TextWriter _writer;

        public MvcDiv(ViewContext viewContext)
        {
            if (viewContext == null)
            {
                throw new ArgumentNullException("viewContext");
            }

            _viewContext = viewContext;
            _writer = viewContext.Writer;
            _originalFormContext = viewContext.FormContext;
            viewContext.FormContext = new FormContext();

            Begin();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Begin()
        {
            _writer.Write("<div>");
        }

        private void End()
        {
            _writer.Write("</div>");
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                _disposed = true;
                End();

                if (_viewContext != null)
                {
                    _viewContext.OutputClientValidation();
                    _viewContext.FormContext = _originalFormContext;
                }
            }
        }

        public void EndForm()
        {
            Dispose(true);
        }
    }

Currently you can call this like so:

<!--prettify lang=csharp-->
    @using (new MvcDiv(Html.ViewContext))
    {
        // ...
    }

Alternative you could implement a `Html.BeginDiv()` extension method which would look like this:

<!--prettify lang=csharp-->
    public static class HtmlHelperExtensions
    {
        public static MvcDiv BeginDiv(this HtmlHelper htmlHelper)
        {
            return new MvcDiv(htmlHelper.ViewContext);
        }
    }
