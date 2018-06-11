import CsvExport from "./CsvExport";

export function create(options) { return new CsvExport(options); }
export function download(data) { return new CsvExport().downloadCsv(data); }
export { CsvExport };
export default { create, download, CsvExport };