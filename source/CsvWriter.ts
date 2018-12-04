import { CsvWriterOptions } from "./options";

/**
 * Writes a CSV file in accordance with https://tools.ietf.org/html/rfc4180
 */
export class CsvWriter {
  private readonly _options : CsvWriterOptions;
  private readonly _rows : string[][];
  
  constructor(options : CsvWriterOptions) {
    this._options = options;
    this._rows = [];
  }

  private get _currentRow() { return this._rows[this._rows.length - 1]; }

  private _quote(string : string) { return "\"" + string.replace(/"/g, "\"\"") + "\"" }

  pushValue(value : any) {
    const stringValue = (value === null || value === undefined) ? "" : value.toString();
    const needsQuote = stringValue.indexOf(this._options.delimiter) !== -1 || /["\r\n]/.test(stringValue);
    this._currentRow.push(needsQuote ? this._quote(stringValue) : stringValue);
  }

  createRow() { this._rows.push([]); }

  toString() { 
    return this._rows.map(row => row.join(this._options.delimiter)).reduce((content, row) => content + "\r\n" + row);
  }

  toBlob() {
    const data = this._options.byteOrderMark ? [this._options.byteOrderMark, this.toString()] : [this.toString()];
    return new Blob(data, { type: this._options.contentType });
  }
}