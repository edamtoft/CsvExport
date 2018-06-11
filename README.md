# CsvExport
Export CSV files from javascript objects in the browser

## Usage

```javascript
import CsvExport from "csvexport";

// See wiki for complete options
const exporter = CsvExport.create({ filename: "export.csv", columns: ["name", "age"] });

const people = [
  {name: "Alice", age: 20},
  {name: "Bob", age: 19},
  {name: "Charlie", age: 30}
];

exporter.downloadCsv(people);
```