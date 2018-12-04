export interface CsvWriterOptions {
  delimiter: string;
  contentType: string;
  byteOrderMark?: string;
}

export interface CsvOptions<TExportSource> extends CsvWriterOptions {
  filename: string;
  headers: { [p in keyof TExportSource]? : string },
  formatters: { [p in keyof TExportSource]? : (value: TExportSource[p]) => string },
  includeHeaders: boolean;
  columns?: (keyof TExportSource)[];
}