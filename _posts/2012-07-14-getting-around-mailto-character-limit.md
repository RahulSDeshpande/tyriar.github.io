---
layout      : post
title       : Getting around the mailto character limit
tags        : [JavaScript]
primarytag  : JavaScript
intro       : I was faced with a problem recently where a web page needed to create an email with the user's email client. This is normally trivial, simply redirect the user to <code>mailto:&lt;emails&gt;</code>. The issues was that the <a href="http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url">maximum length of a URL</a> across different platforms is approximately 2000 characters, and the amount of emails required far exceeded that in some cases. So a solution would need to make multiple mailto requests.
---

Here is the function I came up with:

<!--prettify lang=js-->
    function sendEmails(emails) {
      var timeout = 2000;
      var mailtoPrefix = 'mailto:?bcc=';
      var maxUrlCharacters = 1900;
      var separator = ';';
      var currentIndex = 0;
      var nextIndex = 0;

      if (emails.length < maxUrlCharacters) {
        window.location = mailtoPrefix + emails;
        return;
      }

      do {
        currentIndex = nextIndex;
        nextIndex = emails.indexOf(separator, currentIndex + 1);
      } while (nextIndex != -1 && nextIndex < maxUrlCharacters)

      if (currentIndex == -1) {
        window.location = mailtoPrefix + emails;
      } else {
        window.location = mailtoPrefix + emails.slice(0, currentIndex);
        setTimeout(function () {
          sendEmails(emails.slice(currentIndex + 1));
        }, timeout);
      }
    }

<!--prettify lang=js-->
    // usage
    var emails = 'a@a.com;b@b.com;c@c.com';
    sendEmails(emails);

You may have noticed in the code above I set a rather large timeout for opening email windows (2000ms). Lower amounts seem to not create some of the emails, this is probably just a matter of Outlook (what I was testing against) not accepting multiple at a time.

An alternative solution for the whole problem, if mail client integration isn't required you can always of course fall back on the usual in page form that sends an email.
