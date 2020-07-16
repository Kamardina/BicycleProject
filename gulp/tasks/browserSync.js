// init localserver
module.exports = function () {
  $.gulp.task("browserSync", function () {
    $.browsersync.init({
      server: {
        baseDir: $.destinationFolder,
      },
      port: 3000,
      notify: false,
    });
  });
};
