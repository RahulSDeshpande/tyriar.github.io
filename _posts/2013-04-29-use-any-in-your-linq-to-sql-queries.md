---
layout      : post
title       : Use .Any() in your LINQ to SQL queries
tags        : [C#, LINQ, Optimisation, SQL]
primarytag  : LINQ
intro       : This article explains why you should use the <code>Any()</code> method over <code>Count()</code> in LINQ to SQL.
---

When using LINQ to SQL to check whether either no records exist or at least 1 record exists, be sure to prefer [`Any()`][1] over [`Count()`][2] as the SQL will be optimised to only get the information required. `Any()` will use [`EXISTS`][3] in SQL which [stops as soon as a record is found][4] whereas `Count()` uses [`COUNT(*)`][5] which goes through all the records to get the number matching the query.

Consider the following code samples:

<!--prettify lang=csharp-->
    var q1 = TableName.Count() > 0;

    var q2 = TableName.Any();

They will produce the following SQL:

<!--prettify lang=sql-->
    -- q1
    SELECT COUNT(*) AS [value]
    FROM [TableName] AS [t0]

    -- q1
    SELECT
        (CASE
            WHEN EXISTS(
                SELECT NULL AS [EMPTY]
                FROM [TableName] AS [t0]
                ) THEN 1
            ELSE 0
         END) AS [value]

 As you can see the second sample produces some admittedly uglier SQL but is much more efficient.

[1]: http://msdn.microsoft.com/en-AU/library/bb337697.aspx
[2]: http://msdn.microsoft.com/en-us/library/bb338038.aspx
[3]: http://msdn.microsoft.com/en-us/library/ms188336.aspx
[4]: http://stackoverflow.com/a/2065403/1156119
[5]: http://msdn.microsoft.com/en-us/library/ms175997.aspx
