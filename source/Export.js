(() => {
  
class CsvWriter {
  constructor(delimiter = ",", contentType = "text/csv") {
    this._delimiter = delimiter;
    this._contentType = contentType;
    this._rows = [[]];
  }

  get _currentRow() { return this._rows[this._rows.length-1]; }

  _quote(string) { return "\"" + string.replace(/"/g, "\"\"") + "\"" }

  writeValue(value) {
    let stringValue = value === undefined ? "" : String(value);
    let needsQuote = stringValue.indexOf(this._delimiter) !== -1 || /"\r\n/.test(stringValue);
    this._currentRow.push(needsQuote ? this._quote(stringValue) : stringValue);
  }

  writeLine() { this._rows.push([]); }

  toString() { return this._rows.map(row => row.join(this._delimiter)).reduce((content,row) => content + "\r\n" + row); }

  toBlob() { return new Blob([this.toString()], { type: this._contentType }); }
}


class Export {
  
  constructor(options) {
    this._options = options || {};
  }
  
  _createCsvBlob(data) {
    let delimeter = this._options.delimeter || ",";
    let contentType = this._options.contentType || "text/csv";
    let headerNames = this._options.headers || {};
    let formatters = this._options.formatters || {};
    let includeHeaders = this._options.includeHeaders;
    let getFormater = header => formatters[header] || (v => v);
    let writer = new CsvWriter(delimeter,contentType);
    let headers = this._options.columns || Object.getOwnPropertyNames(data[0]);
    if (includeHeaders === undefined || includeHeaders) {
      headers.forEach(header => writer.writeValue(headerNames[header]||header));
      writer.writeLine();
    }
    data.forEach(row => {
      headers.forEach(header => writer.writeValue(getFormater(header)(row[header])));
      writer.writeLine();
    });
    return writer.toBlob();
  }

  _download(blob, filename)
  {
    if (navigator.msSaveBlob) {
      // Internet Explorer throws "Access is Denied" with ObjectUrls
      navigator.msSaveBlob(blob,filename);
      return;
    }
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