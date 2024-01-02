# FieldServiceManagement

Field Service Management with dynamic listings page (Listing Application).

**Used**
Angular 14, Material UI, Tailwind CSS, and Heroicons

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Details

**OVERVIEW**
This application will have a simple dashboard containing a sidebar with some options/links on the
left side. On clicking the links/options on the sidebar the related data/components will be loaded
on the right side.

**GOALS**
1. Creation of a dynamic listing page, based on the two JSON objects. Where one contains
the meta details of the listing table like dataKey, dataType, etc. The other JSON object will
have the data about the list.
2. This should be flexible enough to add an N-number of new components in the future with
very less modifications.

**USE CASES**
1. On launching the application, the user should be able to see the list of options on the side
nav. For example, here Jobs link will be there.
2. On clicking the Job link, the related data should be rendered in the main container.
3. On clicking the link on the sidebar the name of it should be displayed in the breadcrumb.
4. The total values of the list should be displayed on the breadcrumb.
5. All the data should be rendered based on the keys provided in the Meta JSON file.
6. There should be an option to filter the data.
7. There should be an option to adjust the column's order.
8. There should be an option to jump to any specific page.
9. There should be an option to navigate between the list of all pages.
10. There should be an option to jump from the last to the last pages and vice versa.
11. There should be an option to filter data based on the column name.
12. There should be an option to download the viewing data in the form of a PDF.
13. There should be an option to hide and unhide columns based on the column names.
14. The content of the data should be sortable based on the column name.
15. Columns should be sorted based on the sorted flag received from the backend.
16. There should be an option to check and uncheck for multiple columns.
**CODE FLOW**
On launching the application, the Sidenav component will be loaded. On clicking one of the
menus on Sidenav, the related component will be loaded, where it’ll have a hero area and the
main area. For Example, It’ll route to the Jobs component. Where the Jobs component sends the
data to the Listing component internally.
The Listing component is a dynamic component that accepts the table data which contains meta,
row, and filter properties, and then creates a listing table dynamically. Elements of it are shattered
into individual standalone components like Badge, DateTime, UserProfile, Typography, etc. and
all the related information is passed to those components in the form of inputs.

**DATA PROCESSING**
Consider we are creating a dynamic listing page for job listings.
1. We have to create a new Jobs component and invoke the APIs to get the job-specific
details then we’ll use two util classes that are JSON Mapper and Response Resolver to
build the table data, which will be sent as input to the listings component.
2. JSON Mapper util class is used to transform the keys and values into camel case from
snake case.
3. Response Resolver util class is used to build a table data that contains the Meta
properties, Row Properties, and Filter options. Meta properties will be built by using the
jobs-meta response and Row Properties will be built by using the jobs-data response by
doing specific operations like parsing the values by using the given key and combining
multiple values.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
