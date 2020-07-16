// task to build js
module.exports = function () {
  $.gulp.task("js", function () {
    return $.gulp
      .src([...$.libsJS, $.path.src.js])
      .pipe($.plugins.concat("scripts.js"))
      .pipe($.gulp.dest($.path.dest.js))
      .pipe(
        $.plugins.uglifyEs
          .default()
          .on(
            "error",
            $.plugins.notify.onError("JS-Error: <%= error.message %>")
          )
      )
      .pipe(
        $.plugins.rename({
          extname: ".min.js",
        })
      )
      .pipe($.gulp.dest($.path.dest.js))
      .pipe($.browsersync.stream());
  });
};
