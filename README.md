# CsvExport
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

## Demo

A live demo is available at https://edamtoft.github.io/CsvExport/

## Install

* Option 1: Download https://raw.githubusercontent.com/edamtoft/JsCsvExport/master/dist/Export.min.js
* Option 2: Install via $ npm install csvexport and add a script tag for "node_modules/csvexport/dist/Export.min.js"

## Configuration
Export.create takes an options object which supports the following:

* delimiter: specify a custom delimeter (string; optional; default = ",")
* contentType: specity a custom contentType (string; optional; default = "text/csv")
* filename: a name for the file to download (string; options; default = "export.csv")
* includeHeaders: choose to include or exclude the headers as the first row (boolean; optional; default = true) 
* columns: choose which columns to include. If not specified, will use the properties of the first data item (array; optional)
* headers: object which maps property names to headers (object; optional)
* formatters: object which maps property names to a function which will return the formatted value (object; optional)

### Examples
```javascript
let exporter = Export.create({
  delimiter: "\t",
  contentType: "text/tab-separated-values",
  filename: "some-filename.tsv",
  includeHeaders: "false",
  columns: ["name","age"],
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
