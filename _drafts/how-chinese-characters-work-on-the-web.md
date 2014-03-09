[Internationalization, Unicode]


This post explains how Chinese characters work on the web and the problems that can occur

## Han unification

Chinese characters, meanings

...

Consider the English lower case letter 'a'. It can be written in two different ways that, to a non-English speaker would look like two separate letters. This is a similar concept to Han unification, the letters convey exactly the same meaning but are represented differently.

...

Traditional Chinese is not included in this




## How languages work on the web

### The `lang` attribute

The `lang` attribute is an optional attribute that can be used on any HTML element to *explicitly* indicate the language of the contents.



### The specification

This is what the HTML5 specification has to say about the `lang` attribute and font fallback:

> To determine the language of a node, user agents must look at the nearest ancestor element (including the element itself if the node is an element) that has a `lang` attribute in the XML namespace set or is an HTML element and has a `lang` in no namespace attribute set. That attribute specifies the language of the node (regardless of its value).
> 
> If both the `lang` attribute in no namespace and the `lang` attribute in the XML namespace are set on an element, user agents must use the `lang` attribute in the XML namespace, and the `lang` attribute in no namespace must be ignored for the purposes of determining the element's language.
> 
> If neither the node nor any of the node's ancestors, including the root element, have either attribute set, but there is a pragma-set default language set, then that is the language of the node. If there is no pragma-set default language set, then language information from a higher-level protocol (such as HTTP), if any, must be used as the final fallback language instead. In the absence of any such language information, and in cases where the higher-level protocol reports multiple languages, the language of the node is unknown, and the corresponding language tag is the empty string.
> 
> [<cite>W3C</cite> - HTML5 Specification: The `lang` and `xml:lang` attributes][1]

In other words, an element inherits language code information according to the following order of precedence:

1. The language is set by ***the element*** with the `lang` attribute
2. The language is set by ***an ancestor of the element*** with the `lang` attribute
3. The language is set by ***the server*** with the HTTP `Content-Language` header
4. The language is set by ***user agent*** with user and system preferences

### The `Accept-Language` header

The [`Accept-Language` header][2] is attached to requests in order to tell a server which language(s) the user is interested in. It is normally based on the system language but certain browsers allow the user to go deeper and define an ordered list of languages they are interested in. For example, Chrome on my personal computer uses:

    Accept-Language: en-AU,en;q=0.8,en-US;q=0.6,ko;q=0.4,ja;q=0.2

Indicating that my browser wants to receive pages with languages in the following order of precedence:

1. English (Australia)
2. English
3. English (United States)*
4. Korean
5. Japanese

\* *`en-US` is after `en` because Chrome puts the plain language code directly after a language code containing a region (`AU`)*

So what does this have to do with font fallback? Well, this header is exactly the last fallback that the HTML5 specification says to use as a page's language code.

#### Chromium and WebKit

At the time of writing this article, Chromium and WebKit both don't implement this last step which is primarily a problem for the CJK fonts. There are open issues on their respective sites:

- [Chromium issue][3]
- [WebKit issue][4]

Unfortunately they haven't seem much activity recently.

#### Checking `Accept-Language` header

A neat little service exists that spits back the HTTP headers that were used in the request. Crack open your dev tools (on a site that has jQuery) and use the following `Accept-Language` header:

<!--prettify lang=js-->
    $.ajax({
      url: "http://ajaxhttpheaders.appspot.com",
      dataType: 'jsonp',
      success: function(headers) {
        console.log(headers['Accept-Language']);
      }
    });



## Chinese, Japanese and Korean characters 

### Han unification 

Unfortunately the above isn't all there is to font fallback on the web. The primary cause of issues with font rendering comes from <abbr title="Chinese Japanese Korean">CJK</a> characters, which is the collective term for the characters based on Chinese characters for these languages.

To give some more context I'll start with a bit of a language lesson. The Chinese writing system has two scripts; traditional and simplified. 











### Font fallback

...











It is exceptionally difficult for a browser to figure out what the correct language is when the lang attribute isn't specified. Most browsers will assume the system language is correct if lang is not present.

Consider a bi-lingual person who speaks Chinese and Korean, if lang is not present then the system language will be used to determine the glyphs. This will lead to Chinese being displayed on Korean websites, leading to confusion. This is a particular issue for language learners as they will receive mixed signals.





http://homepage.ntlworld.com/jonathan.deboynepollard/FGA/unicode-cjkv-character-set-rationalization.html




[1]: http://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes
[2]: https://www.w3.org/International/questions/qa-accept-lang-locales
[3]: http://crbug.com/179331
[4]: https://bugs.webkit.org/show_bug.cgi?id=93985