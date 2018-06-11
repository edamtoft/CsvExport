import CsvWriter from "./CsvWriter";
import { download, noOp, merge } from "./utilities";

export default class CsvExport {
  constructor(options) {
    this._options = {
      delimiter: ",",
      contentType: "text/csv",
      headers: {},
      formatters: {},
      includeHeaders: true
    };
    merge(this._options, options);
  }

  createCsvBlob(data) {
    // defaults
    const {
      delimiter,
      contentType,
      headers,
      formatters,
      includeHeaders,
      byteOrderMark,
      columns
    } = this._options;

    const writer = new CsvWriter(delimiter, contentType, byteOrderMark);
    const props = columns || Object.getOwnPropertyNames(data[0]);

    if (includeHeaders) {
      writer.pushRow();
      props.forEach(prop => writer.pushValue(headers[prop] || prop));
    }

    data.forEach(row => {
      writer.pushRow();
      props.forEach(prop => writer.pushValue((formatters[prop] || noOp)(row[prop])));
    });

    return writer.toBlob();
  }

  downloadCsv(data) {
    if (!data) {
      throw new Error("No data provided. File would be empty.");
      return;
    }

    const { filename } = this._options;
    const blob = this.createCsvBlob(data);
    download(blob, filename);
  }
}