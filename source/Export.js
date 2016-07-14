(() => {
  
class CsvWriter {
  constructor(delimiter = ",") {
    this._delimiter = delimiter;
    this._rows = [[]];
  }

  get _currentRow() { return this._rows[this._rows.length-1]; }

  _quote(string) { return "\"" + string.replace(/"/g, "\"\"") + "\"" }

  writeValue(value) {
    let stringValue = String(value);
    let needsQuote = stringValue.indexOf(this._delimiter) !== -1 || /"\r\n/.test(stringValue);
    this._currentRow.push(needsQuote ? this._quote(stringValue) : stringValue);
  }

  writeLine() { this._rows.push([]); }

  toString() { return this._rows.map(row => row.join(this._delimiter)).reduce((content,row) => content + "\r\n" + row); }

  toBlob(contentType = "text/csv") { return new Blob([this.toString()], { type: contentType }); }
}


class Export {
  
  constructor(options) {
    this._options = options || {};
  }
  
  _createCsvBlob(data) {
    let delimeter = this._options.delimeter || ",";
    let headerNames = this._options.headers || {};
    let formatters = this._options.formatters || {};
    let getFormater = header => formatters[header] || (v => v);
    let writer = new CsvWriter(delimeter);
    let headers = Object.getOwnPropertyNames(data[0])
      .filter(header => headerNames[header] !== null);
    headers.forEach(header => writer.writeValue(headerNames[header]||header));
    writer.writeLine();
    data.forEach(row => {
      headers.forEach(header => writer.writeValue(getFormater(header)(row[header])));
      writer.writeLine();
    });
    return writer.toBlob("text/csv");
  }

  _download(blob, filename)
  {
    let link = document.createElement("A");
    let url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  downloadCsv(data) {
  	try {
    	console.info("Generating CSV download");
      let blob = this._createCsvBlob(data);
      let filename = this._options.filename || "export.csv";
      this._download(blob, filename);
    } catch(err) {
    	alert(`Unable to create export: ${err.message}`);
      console.error(err);
    }
  }
  
  static create(options) { return new Export(options); }

  static download(data) { return new Export().downloadCsv(data); }
}

window.Export = Export;

})();