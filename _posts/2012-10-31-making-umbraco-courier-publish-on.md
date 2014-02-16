---
layout      : post
title       : Making Umbraco Courier publish on transfer
tags        : [Umbraco]
primarytag  : Umbraco
intro       : This article shows how to configure your Umbraco website to have Courier publish notes automatically when tranferred.
---

Add the following to your website's `web.config` file to have Umbraco Courier publish nodes automatically on transfer:

<!--prettify lang=xml-->
    <configuration>
      <appSettings>
        <add key="CourierRepublish" value="true" />
      </appSettings>
    </configuration>

This is particularly useful when nodes are being transferred from a production environment to a test environment as the content does not need to be reviewed before it is published.
