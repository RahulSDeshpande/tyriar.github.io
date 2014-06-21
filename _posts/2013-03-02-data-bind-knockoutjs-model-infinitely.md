---
layout      : post
title       : Data-bind a Knockout.js model infinitely deep
tags        : [Accessibility, JavaScript, Knockout]
socialimage : /images/2013/03/02/knockoutjs.png
primarytag  : JavaScript
gpluspost   : WYNSYWZrr1M
intro       : This post will show you how to data-bind a hierarchical model that can go infinitely deep onto a page using Knockout.js. In this post, I will make a screen that will be used to build an organisation chart as an example, I chose this as it's a really simple example to illustrate the technique that I'll be using.
---

{% include post-image.html class="right-col" alt="Knockout logo" src="/images/2013/03/02/knockoutjs.png" %}



## Model

First we create the model that we want to bind to the UI. Our model is of an employee that will have a name, a link to it's boss and array of employees (subordinates).

<div class="clear"><!----></div>

<!--prettify lang=js-->
    function Employee(name, boss) {
        this.name = name;
        this.boss = boss;
        this.employees = ko.observableArray([]);
    }



## Template

The template is used to display the model, our template will iterate over an array of employees, show their name and point back to itself to do it again with each of the employee's subordinates.


<!--prettify lang=html-->
    <div data-bind="template: { name: 'organisation-template', foreach: employees }"></div>

    <script id="organisation-template"  type="text/html">
        <label data-bind="attr: { 'for': nameId }">Name:</label>
        <input data-bind="attr: { 'id': nameId }, value: name" />
        <div data-bind="template: { name: 'organisation-template', foreach: employees }"></div>
    </script>

The `nameId` property on the `Employee` model is included to give the name textbox a unique id so that it can have a label. Accessibility is good!

<!--prettify lang=javascript-->
    function Employee(name, boss) {
        /* the rest of the code */

        this.nameId = ko.computed(function() {
            return name.split(' ').join('_')
                       .split('.').join('_');
        });
    }

Let's also go ahead and add a little CSS so we can differentiate the hierarchy levels.

<!--prettify lang=css-->
    .employee {
        border:1px solid #ccc;
        padding:.3em;
        margin-bottom:.3em;
    }

    .employee:last-child {
        margin-bottom:0;
    }



## Test data

Now let's create some test JSON to display on the UI initially, in practice this would normally come from a server.

<!--prettify lang=javascript-->
    var jsonModel = '{"employees":[{"name":"Jason Alexander","employees":[{"name": "George Costanza","employees":[{"name":"Art Vandelay"}]}]},{"name":"Michael Richards","employees":[{"name":"Cosmo Kramer","employees":[{"name":"H.E. Pennypacker"},{"name":"Bob Sacamano"}]}]},{"name":"Jerry Seinfeld","employees":[{"name":"Kel Varnsen"}]}]}';



## Parse the JSON

Now we will create the model from the JSON model that was defined in the above section.

<!--prettify lang=javascript-->
    function OrganisationViewModel() {
        initialiseModel(this, jsonModel);
    }

    function initialiseModel(model, jsonModel) {
        parsedModel = JSON.parse(jsonModel);
        model.employees = ko.observableArray([]);
        addEmployees(model, parsedModel.employees);
        console.log(model);
    }

    function addEmployees(bossModel, employees) {
        if (typeof employees === "undefined")
            return;

        for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];
            var employeeModel = new Employee(employee.name, bossModel);
            bossModel.employees.push(employeeModel);
            addEmployees(employeeModel, employee.employees);
        }
    }



## Data bind

Finally everything is ready to data bind!


<!--prettify lang=javascript-->
    ko.applyBindings(new OrganisationViewModel());

It should look like this now:

{% include post-image.html class="center-aligned" alt="Databind" src="/images/2013/03/02/databind.png" %}



## Add/delete buttons

We also want to be able to add and delete employees, start by creating the JavaScript functions and attaching them to the model. Notice that we're reusing the addEmployee function on `OrganisationViewModel` as well to create out root-level employees.

<!--prettify lang=javascript-->
    function addRule() {
        var newRule = new Rule('Fresh rule', this);
        this.rules.push(newRule);
    }

    function deleteRule() {
        var parent = this.parent;
        parent.rules.splice(parent.rules.indexOf(this), 1);
    }

    OrganisationViewModel.prototype.addEmployee = addEmployee;
    Employee.prototype.addEmployee = addEmployee;
    Employee.prototype.deleteEmployee = deleteEmployee;

To hook this is up the UI we need a `<button>` for each model function.

<!--prettify lang=html-->
    <button data-bind="click: addEmployee">Add employee</button>
    <div data-bind="template: { name: 'organisation-template', foreach: employees }"></div>

    <script id="organisation-template"  type="text/html">
        <div class="employee">
            <label data-bind="attr: { 'for': nameId }">Name:</label>
            <input data-bind="attr: { 'id': nameId }, value: name" />
            <button data-bind="click: addEmployee">Add employee</button>
            <button data-bind="click: deleteEmployee">Delete employee</button>
            <div data-bind="template: { name: 'organisation-template', foreach: employees }"></div>
        </div>
    </script>



## End result

And it's done! Click here to see a working example. It should look like this

{% include post-image.html class="center-aligned" alt="End result" src="/images/2013/03/02/endresult.png" %}

{% include post-image.html class="center-aligned" alt="End result 2" src="/images/2013/03/02/endresult2.png" %}

[Knockout logo]: https://googledrive.com/host/0B-wUQaw640vCRlBNMXFfWlhRcTA/knockoutjs.png
[Databind]: https://googledrive.com/host/0B-wUQaw640vCRlBNMXFfWlhRcTA/databind.png
[End result]: https://googledrive.com/host/0B-wUQaw640vCRlBNMXFfWlhRcTA/endresult.png
[End result 2]: https://googledrive.com/host/0B-wUQaw640vCRlBNMXFfWlhRcTA/endresult2.png
