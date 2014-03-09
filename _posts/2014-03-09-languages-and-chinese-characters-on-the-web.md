---
layout      : post
title       : Languages and Chinese characters on the web
#isfeatured  : 1
draft : 1
tags        : [Accessibility, Chrome, HTML, Natural language, Opera, Safari, Unicode]
preview     : /images/2014/03/09/cjk-characters.png
socialimage : /images/2014/03/09/cjk-characters.png
primarytag  : Accessibility
intro       : East-Asian languages are a bit of a mess on the internet for a number of reasons, such as browser implementation, the presence of system fonts and web developers neglecting to address the issue on their side. This article dives deep into how languages work on the web and the problems that can occur.
---

## The `lang` attribute

`lang` is an optional HTML attribute that can be used on any element to *explicitly* indicate the language of the contents using an [IETF language tag][8].

<!--prettify lang=html-->
    <div lang="en">
      <ul>
        <li>Chinese: <span lang="cn">你好</span></li>
        <li>French: <span lang="fr">Bonjour</span></li>
        <li>German: <span lang="de">Guten Tag</span></li>
        <li>Japanese: <span lang="ja">今日は</span></li>
        <li>Korean: <span lang="ko">안녕하세요</span></li>
        <li>Thai: <span lang="th">สวัสดี</span></li>
        <li>Russian: <span lang="ru">привет</span></li>
      </ul>
    </div>

The `lang` attribute can be viewed through developer tools on WebKit and Blink-based browsers by inspecting an element and finding the `-webkit-locale` style. If the element is inheriting the `lang` from an ancestor, you will need to view inherited styles.



## The specification

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
4. The language is set by ***the user agent*** with user and system preferences



## The `Accept-Language` header

The [`Accept-Language` header][2] is attached to requests to tell a server which language(s) the user is interested in. It is normally based on the system language but certain browsers allow the user to go deeper and define an ordered list of languages they want. For example, Chrome on my personal computer uses:

    Accept-Language: en-AU,en;q=0.8,en-US;q=0.6,ko;q=0.4,ja;q=0.2

Indicating that my browser wants to receive pages with languages in the following order of precedence:

1. English (Australia)
2. English
3. English (United States)*
4. Korean
5. Japanese

\* *`en-US` is after `en` because Chrome puts the plain language code directly after a language code containing a region (`en-AU`)*

So what does this have to do with font fallback? Well, this header is the fourth and last fallback that the HTML5 specification says to use as a page's language code.

### Chromium and WebKit

At the time of writing this article, Chromium and WebKit both don't implement this last step. There are open issues on their respective sites:

- [Chromium issue][3]
- [WebKit issue][4]

Unfortunately they haven't seem much activity recently.

### Checking `Accept-Language` header

A neat little service exists that spits back the HTTP headers that were used in the request. Crack open your dev tools on a site that has jQuery and use the following to output the `Accept-Language` header to the console log:

<!--prettify lang=js-->
    $.ajax({
      url: "http://ajaxhttpheaders.appspot.com",
      dataType: 'jsonp',
      success: function(headers) {
        console.log(headers['Accept-Language']);
      }
    });



## Chinese, Japanese and Korean characters 

Unfortunately this isn't all there is to font fallback on the web. The primary cause of issues with font rendering come from the <abbr title="Chinese Japanese Korean">CJK</abbr> characters, which is the collective term for the characters based on Chinese characters for these languages.

To give some more context of the problem, I'll start with a little language lesson. The Chinese writing system has two scripts; traditional and simplified. Traditional Chinese characters are used by Hong Kong and Taiwan while Simplified Chinese is used by China, Singapore and Malaysia. Korean and Japanese have their own scripts but also use Chinese characters, both of which modify the way that some characters are written, far more of this happens for Japanese. It's somewhat difficult to get exact numbers of how many Chinese characters are used by each language but here are approximations from a little research:

- 106,230+ Traditional Chinese characters
- 2,235+ Simplified Chinese characters
- 53,667+ Korean
- 50,000+ Japanese

### Han unification 

Han unification (or Unihan) is a project by Unicode to combine the <abbr title="Chinese Japanese Korean">CJK</abbr> characters into a single, unified set of characters in an effort to reduce the total number of characters needed to be encoded. Characters that were derived from the same character were merged into a single character code in the Unicode Standard.

{% include post-image.html class="center-aligned" alt="An image comparing the CJK characters 判, 与, 海, 直, 約, 返, 次 and 今" caption="Demonstrates the difference between CJK characters all using the same character code (<a href="http://codepen.io/Tyriar/pen/mqLkH">live demo</a>)" src="/images/2014/03/09/cjk-characters.png" %}

One of the main driving forces for Unihan was to reduce the amount of characters required to fit in the first version of Unicode which was designed to fit in only 16 bits leaving room for only 65,536 characters. Unicode was later extended to 21 bits to reduce these sorts of problems later. Currently only a small number of possible character codes are currently assigned.

Unihan actually met with a bit of controversy for numerous reasons, such as:

- The initial Unicode team, before East-Asian governments were participating, was largely composed of American organisations.
- Two of these languages can appear together, and do occasionally because of multiple factors, this can cause offence to the reader due to sociopolitical reasons for example.
- A simpler solution could have been to increase the amount of bits in a Unicode character, which happened at a later point anyway.

### Where this fails users

Unless `lang` is explicitly defined, this fails users in a specific use case. Consider a bi-lingual person who speaks two of the <abbr title="Chinese Japanese Korean">CJK</abbr> languages, say Chinese (mother-tongue) and Japanese. If `lang` is not present then the system language will be used to determine the glyphs. This leads to characters always being displayed using *Chinese* glyphs, even on Japanese websites. This is a particular issue for language learners as it will cause confusion as to how the character is written in that language.

### How do we fix it?

A browser could potentially leverage knowledge such as the top-level domain or scanning a document for the presence of certain other scripts such as kana (Japanese) or hangul (Korean) to make a more educated guess of the document's language. But these are both non-standard techniques leading to inconsistent behavior across browsers and could degrade browser performance (particularly the second one).

The right answer in my book is to follow the [W3C's recommendation][5] and ***always define the `lang` attribute on the `html` element***. Doing so would fix all the font selection problems that browsers experience with <abbr title="Chinese Japanese Korean">CJK</abbr> fonts, in addition to adding more *very* valuable metadata to the document that could be consumed in various ways.



## References

- [The Unicode Standard version 6.3.0][6]
- [HTML5 Specification][10]
 - [The `lang` and `xml:lang` attributes][9]
- [W3C Internationalisation][11]
 - [Accept-Language used for locale setting][13]
 - [Declaring language in HTML][14]
- [Wikipedia][16]
 - [Chinese Characters: Number of characters][7]
 - [Han unification][15]
- [Unicode CJKV character set rationalization][12]

[1]: http://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes
[2]: https://www.w3.org/International/questions/qa-accept-lang-locales
[3]: http://crbug.com/179331
[4]: https://bugs.webkit.org/show_bug.cgi?id=93985
[5]: http://www.w3.org/International/questions/qa-html-language-declarations
[6]: http://www.unicode.org/versions/Unicode6.3.0/
[7]: http://en.wikipedia.org/wiki/Chinese_characters#Number_of_characters
[8]: http://tools.ietf.org/rfc/bcp/bcp47.txt
[9]: http://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes
[10]: http://www.w3.org/TR/html5
[11]: http://www.w3.org/International/
[12]: http://homepage.ntlworld.com/jonathan.deboynepollard/FGA/unicode-cjkv-character-set-rationalization.html
[13]: http://www.w3.org/International/questions/qa-accept-lang-locales
[14]: http://www.w3.org/International/questions/qa-html-language-declarations
[15]: http://en.wikipedia.org/wiki/Han_unification
[16]: http://en.wikipedia.org