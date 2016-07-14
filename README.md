# JsCsvExport
Export CSV files from javascript objects in the browser

## Usage
```javascript
let exporter = Export.create();

let people = [
  {name: "Alice", age: 20},
  {name: "Bob", age: 19},
  {name: "Charlie", age: 30}
];

exporter.downloadCsv(people);

```

## Install

* Option 1: Download https://raw.githubusercontent.com/edamtoft/JsCsvExport/master/dist/Export.min.js
* Option 2: Install via $ npm install csvexport and add a script tag for "node_modules/csvexport/dist/Export.min.js"

## Configuration
Export.create takes an options object which supports the following:

* delimiter: specify a custom delimeter (string; optional; default = ",")
* contentType: specity a custom contentType (string; optional; default = "text/csv")
* headers: object which maps property names to headers. Put header as null to remove a particular field (object; optional)
* formatters: object which maps property names to a function which will return the formatted value (object; optional)

### Examples
```javascript
let exporter = Export.create({
  delimiter: "\t",
  contentType: "text/tab-separated-values",
  headers: {
    name: "Person's Name",
    age: "Person's Age"
  },
  formatters: {
    age: age => age + " years old"
  }
});

exporter.downloadCsv(people);
```
