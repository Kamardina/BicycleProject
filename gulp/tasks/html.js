// task to build html
module.exports = function () {
  $.gulp.task("html", function () {
    return $.gulp
      .src($.path.src.html)
      .pipe($.plugins.fileInclude())
      .pipe($.gulp.dest($.path.dest.html))
      .pipe($.browsersync.stream());
  });
};
