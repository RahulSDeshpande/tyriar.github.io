---
layout      : post
title       : ASP.NET MVC display and editor templates
tags        : [.NET, ASP.NET MVC, C#, Razor]
isfeatured  : 1
preview     : /images/2012/12/16/logo.png
socialimage : /images/2012/12/16/logo.png
primarytag  : ASP.NET
intro       : Display and editor templates in ASP.NET MVC let us create views in a more maintainable and elegant ways. This article looks at how to define custom templates to display and manipulate different data types.
---

{% include post-image.html class="right-col" alt=".NET logo" src="/images/2012/12/16/logo.png" %}

## Display templates

MVC has a bunch of handy helpers that we can use to create our views more efficiently. One such helper are the display templates that are used within views.

<div class="clear"><!----></div>

<!--prettify lang=csharp-->
    @Html.DisplayFor(e => e.Username)

The `DisplayFor(Func<TModel, TValue> expression)` function uses the type of the property in the expression to display the property value.

<!--prettify lang=html-->
    <!-- DisplayFor on string UserName = "daniel.imms" -->
    <span class="field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true">daniel.imms</span>

### Defining custom templates

We can override the default templates by placing our custom display templates into the path `Views/Shared/DisplayTemplates/<type>.cshtml`. They are structured like any MVC partial view. An example usage could be adding a dollar sign to the front of a decimal's value.

#### Model

<!--prettify lang=csharp-->
    public class TestModel
    {
        public decimal Money { get; set; }
    }

#### `Views/Shared/DisplayTemplates/decimal.cshtml`

<!--prettify lang=csharp-->
    @model decimal

    @{
        IFormatProvider formatProvider =
            new System.Globalization.CultureInfo("en-US");
        <span class="currency">@Model.ToString("C", formatProvider)</span>
    }

#### View

<!--prettify lang=csharp-->
    @model TestModel
    
    @Html.DisplayFor(e => e.Money)

#### Output

<!--prettify lang=html-->
    <span class="currency">$3.50</span>



### `UIHint` attribute

To use a custom display template that isn't based on the name of the type, we can set a `UIHint` attribute on the property. So we could make a 'Currency' display template instead of assuming that all decimals are dollar amounts. To do this we would simply rename our `decimal.cshtml` file above to `Currency.cshtml` and apply the `UIHint` attribute to the model property like so:

<!--prettify lang=csharp-->
    public class TestModel
    {
        [UIHint("Currency")]
        public decimal Money { get; set; }
    }



## Editor templates

Editor templates can be overridden in the same way using the `EditorFor` function and placing the custom templates in `Views/Shared/EditorTemplates/<type>.cshtml`.

### Passing additional data

It may be necessary to provide more than just a property to the custom template. For example if we want to display a list of radio buttons with one of them selected. This could be achieved by passing in the list of options as 'view data' and having the property as an `int?` which would represents the index of the selected option. MVC provides an overload that allows us to pass in this additional view data to the custom template, `EditorFor(Func<TModel, TValue> expression, Object additionalViewData)`.

#### Model

<!--prettify lang=csharp-->
    public class UserModel
    {
        [UIHint("RadioButtonList")]
        public int? UserRole { get; set; }
    }

#### Controller

<!--prettify lang=csharp-->
    public class TestController : Controller
    {
        public ActionResult Test()
        {
            return View(new UserModel() { UserRole = 2 });
        }
    }

#### View

<!--prettify lang=csharp-->
    @model UserModel

    @{
        // In a real system we would get this list from the database
        List<SelectListItem> list = new List<SelectListItem>();
        list.Add(new SelectListItem() { Text = "Admin", Value = "0" });
        list.Add(new SelectListItem() { Text = "Project manager", Value = "1" });
        list.Add(new SelectListItem() { Text = "User", Value = "2" });
    }

    @Html.EditorFor(e => e.UserRole, new { List = list })

#### `Views/Shared/EditorTemplates/RadioButtonList.cshtml`

<!--prettify lang=csharp-->
    @model int?

    @using System.Collections
    @using System.Web.Mvc;

    @{
        var list = (List<SelectListItem>)ViewData["List"];
    }

    <ul class="radio-list">
        @foreach (var item in list)
        {
            <li>
                @{
                    var radioId = 
                        ViewData.TemplateInfo.GetFullHtmlFieldId(item.Value);
                    var checkedClass = (item.Value == Model.ToString() 
                                        ? "checked" 
                                        : string.Empty);
                    <input type="radio"
                           id="@radioId"
                           name="@ViewData.TemplateInfo.HtmlFieldPrefix"
                           value="@item.Value"
                           checked="@checkedClass" />
                    <label for="@radioId">@item.Text</label>
                }
            </li>
        }
    </ul>

#### Output

<!--prettify lang=html-->
    <ul class="radio-list">
        <li>
            <input type="radio"
                   id="UserRole_0"
                   name="UserRole"
                   value="0"
                   checked="" />
            <label for="UserRole_0">Admin</label>
        </li>
        <li>
            <input type="radio"
                   id="UserRole_1"
                   name="UserRole"
                   value="1"
                   checked="" />
            <label for="UserRole_1">Project manager</label>
        </li>
        <li>
            <input type="radio"
                   id="UserRole_2"
                   name="UserRole"
                   value="2"
                   checked="checked" />
            <label for="UserRole_2">User</label>
        </li>
    </ul>



## Usage examples

- Format currency
- Format dates in a particular way
- Format credit card numbers
- Display a list of radio buttons or check boxes
- Add custom classes/IDs/structure to the output markup
