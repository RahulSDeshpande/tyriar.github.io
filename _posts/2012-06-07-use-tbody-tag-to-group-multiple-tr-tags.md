---
layout      : post
title       : Use the tbody tag to group multiple tr tags
tags        : [HTML]
primarytag  : HTML
intro       : It is sometimes necessary to group the rows of a HTML table. Say you want to display tabular data of a person and their qualifications, you could achieve this by having the name of the person and qualification on separate rows.
---

<table>
<tbody>
<tr>
<th>Name</th>
<th>Qualification</th>
</tr>
<tr>
<td>Frank Doe</td>
<td>Bachelor of Arts</td>
</tr>
<tr>
<td>John Smith</td>
<td>Bachelor of Science</td>
</tr>
<tr>
<td>John Smith</td>
<td>Bachelor of Science</td>
</tr>
<tr>
<td>John Smith</td>
<td>Master of Science</td>
</tr>
<tr>
<td>Alice Mane</td>
<td>Diploma of Information Technology</td>
</tr>
<tr>
<td>Alice Mane</td>
<td>Bachelor of Computer Science</td>
</tr>
</tbody></table>

This isn't ideal of course as firstly you are duplicating information, and making the table more busy than it needs to be. But there is also the issue of what to do if there are multiple people with the same name. A nice fix to this issue which is isn't very widely known is that you can group table rows by using the tbody tag. It also comes with the added benefit of being able to create hover styles that span the row and having the collection of rows use the same click event.

{% include codepen.html id="hFjvc" height="268" description="Table rows grouped using tbody" %}

<!--prettify lang=html-->
    <style>
      #example {
        border:solid #999 1px;
        border-collapse:collapse;
      }
      #example td {
        padding:2px;
      }
      #example tbody:hover td {
        background:#CCC;
        cursor:pointer;
      }
    </style>

    <table id="example">
      <thead>
        <tr>
          <th>Name</th>
          <th>Qualification</th>
        </tr>
      </thead>
      <tbody onclick="javascript:alert('Frank Doe')">
        <tr>
          <td>Frank Doe</td>
          <td>Bachelor of Arts</td>
        </tr>
      </tbody>
      <tbody onclick="javascript:alert('John Smith #1')">
        <tr>
          <td>John Smith</td>
          <td>Bachelor of Science</td>
        </tr>
      </tbody>
      <tbody onclick="javascript:alert('John Smith #2')">
        <tr>
          <td rowspan="2">John Smith</td>
          <td>Bachelor of Science</td>
        </tr>
        <tr>
          <td>Master of Science</td>
        </tr>
      </tbody>
      <tbody onclick="javascript:alert('Alice Mane')">
        <tr>
          <td rowspan="2">Alice Mane</td>
          <td>Diploma of Information Technology</td>
        </tr>
        <tr>
          <td>Bachelor of Computer Science</td>
        </tr>
      </tbody>
    </table>