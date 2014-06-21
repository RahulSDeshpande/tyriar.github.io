---
layout      : post
title       : Entity framework delete all entities extension method
tags        : [C#, Entity framework, Extension method]
primarytag  : C#
gpluspost   : Z3MDscrETNF
intro       : Unfortunately when deleting items in entity framework the SQL commands are issued as single <code>DELETE</code> statements for each entity. This really becomes a bottleneck when there are a several thousand items. This handy set of extension methods allows convenient and efficient deletion of all entities for a particular type <code>T</code>. The <code>GetTableName&lt;T&gt;</code> used function even takes into account table mappings set up with the <code>ModelBuilder</code>.
---

Thanks to [Rul Jarimba][1] on Stack Overflow for the [`GetTableName<T>` function][2]. 

<!--prettify lang=csharp-->
    public static void DeleteAllEntities<T>(this DbContext db)
        where T : class
    {
        var adapter = (IObjectContextAdapter)db;
        var objectContext = adapter.ObjectContext;
        var sql = string.Format("DELETE FROM {0}", objectContext.GetTableName<T>());
        var entityConnection = objectContext.ExecuteStoreCommand(sql);
    }

    public static string GetTableName<T>(this ObjectContext context)
        where T : class
    {
        string sql = context.CreateObjectSet<T>().ToTraceString();
        Regex regex = new Regex("FROM (?<table>.*) AS");
        Match match = regex.Match(sql);

        string table = match.Groups["table"].Value;
        return table;
    }



[1]: http://stackoverflow.com/users/558486/rui-jarimba
[2]: http://stackoverflow.com/a/9760774/1156119
