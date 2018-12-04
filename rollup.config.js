import typescript from "rollup-plugin-typescript";

export default {
  input: "source/index.ts",
  plugins: [
    typescript({ target: "es5" })
  ],
  output: [{
    file: "dist/CsvExport.umd.js",
    format: "umd",
    name: "CsvExport"
  },{
    file: "dist/CsvExport.js",
    format: "iife",
    name: "CsvExport"
  }]
};