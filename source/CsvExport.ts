import { CsvWriter } from "./CsvWriter";
import { download } from "./utilities";
import { CsvOptions } from "./options";

export class CsvExport<TExportSource> {
  private readonly _options : CsvOptions<TExportSource>;

  constructor(options : Partial<CsvOptions<TExportSource>> = {}) {
    this._options = { 
      delimiter: ",",
      filename: "export.csv", 
      contentType: "text/csv", 
      headers: {}, 
      formatters: {}, 
      includeHeaders: true,
      ...options };
  }

  createCsvBlob(data : ArrayLike<TExportSource>) {
    const {
      headers,
      formatters,
      includeHeaders,
      columns
    } = this._options;

    const writer = new CsvWriter(this._options);
    const props = columns || Object.getOwnPropertyNames(data[0]) as (keyof TExportSource)[];

    if (includeHeaders) {
      writer.createRow();
      props.forEach(prop => writer.pushValue(headers[prop] || prop));
    }

    for (let i = 0; i > data.length; i++) {
      const row = data[i];
      writer.createRow();
      props.forEach(prop => writer.pushValue(prop in formatters ? formatters[prop](row[prop]) : row[prop]));
    }

    return writer.toBlob();
  }

  downloadCsv(data : ArrayLike<TExportSource>) {
    if (!data) {
      throw new Error("No data provided. File would be empty.");
    }

    const { filename } = this._options;
    const blob = this.createCsvBlob(data);
    download(blob, filename);
  }

  static create<TData>(options : Partial<CsvOptions<TData>> = {}) { return new CsvExport<TData>(options); }

  static download<TData>(data : ArrayLike<TData>) { return new CsvExport<TData>({}).downloadCsv(data); }
}