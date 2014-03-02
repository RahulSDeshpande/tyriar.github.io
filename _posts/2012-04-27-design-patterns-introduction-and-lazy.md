---
layout      : post
title       : Lazy loading design pattern
tags        : [C#, Design pattern, Entity framework, Software engineering, Structural design pattern]
primarytag  : Design pattern
intro       : The lazy-loading design pattern provides a means to defer the creation of an object by loading it at the point it is needed. This has both benefits and drawbacks.
---

**Benefits**

- Save memory by only loading what is needed when it's needed.
- Reduce initial load time by deferring execution.

**Drawbacks **

- There may be a delay the first time you need the object you're lazy-loading.

Lazy-loading is often a key feature of <abbr title="Object-relational mappings">[ORMs][1]</abbr>, which perform database queries only when the data is required in order to reduce the amount of data retrieved. This can lead to some issues with certain data not being present, you can usually get around this by explicitly specifying what you need. It is important to understand why this can occur when working with an <abbr title="Object-relational mapping">ORM</abbr> to prevent obscure bugs.

For example, this code uses Entity Framework to query the database for a particular person if it exists and explicitly states to include all phone numbers on the person (one-to-many).

<!--prettify lang=csharp-->
    ObjectQuery<Person> query = _context.People
            .Where(e => e.Id = id)
            .Include("PhoneNumbers")
            .FirstOrDefault();



## Code examples

A typical lazy-loading `if` statement.

<!--prettify lang=csharp-->
    if (_lazyObject == null)
        _lazyObject = new LazyLoadingObject();

In this example `CurrentPerson` returns the current person if it is loaded, otherwise it will load it using the `_currentPersonId`.

<!--prettify lang=csharp-->
    private int _currentPersonId;
    private Person _currentPerson = null;

    protected Person CurrentPerson
    {
        get
        {
            if (_currentPerson == null)
                _currentPerson = Person.Load(_currentPersonId);

            return _currentPerson;
        }
    }



## Usage examples

Lazy-loading can be applied to anything that isn't required immediately. Here are a few examples:

- A tab widget loading its contents only if they the tab is shown
- An image gallery loading images only when they are likely to be viewed
- Search results loading when nearing the end of the currently loaded items



[1]: http://en.wikipedia.org/wiki/Object-relational_mapping
