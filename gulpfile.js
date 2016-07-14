const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("default", () => gulp
  .src("source/*.js")
  .pipe(babel({ presets: ["es2015"] })) // transpile
  .pipe(uglify()) // minify
  .pipe(rename({ suffix: ".min" })) // rename to Export.min.js
  .pipe(gulp.dest("dist")) // save result
);