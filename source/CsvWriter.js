/**
 * Writes a CSV file in accordance with https://tools.ietf.org/html/rfc4180
 */
export default class CsvWriter {
  constructor(delimiter, contentType, byteOrderMark) {
    this._delimiter = delimiter;
    this._contentType = contentType;
    this._byteOrderMark = byteOrderMark;
    this._rows = [];
  }

  get _currentRow() { return this._rows[this._rows.length - 1]; }

  _quote(string) { return "\"" + string.replace(/"/g, "\"\"") + "\"" }

  pushValue(value) {
    const stringValue = (value === null || value === undefined) ? "" : String(value);
    const needsQuote = stringValue.indexOf(this._delimiter) !== -1 || /["\r\n]/.test(stringValue);
    this._currentRow.push(needsQuote ? this._quote(stringValue) : stringValue);
  }

  pushRow() { this._rows.push([]); }

  toString() { 
    return this._rows.map(row => row.join(this._delimiter)).reduce((content, row) => content + "\r\n" + row);
  }

  toBlob() {
    const data = this._byteOrderMark ? [this._byteOrderMark, this.toString()] : [this.toString()];
    return new Blob(data, { type: this._contentType });
  }
}