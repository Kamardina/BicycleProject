const destinationFolder = "./dest/"; // <-folder to return the result
const sourceFolder = "./src"; // <-source folder

global.$ = {
  destinationFolder, // <-folder to return the result
  sourceFolder, // <-source folder

  path: {
    task: require("./gulp/paths/tasks.js"),

    dest: {
      html: destinationFolder + "/",
      css: destinationFolder + "/css/",
      js: destinationFolder + "/js/",
      img: destinationFolder + "/img/",
    },
    // paths to source files
    src: {
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      css: sourceFolder + "/scss/style.scss",
      js: sourceFolder + "/js/**/*js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
      // paths to modify files
      html: sourceFolder + "/**/*.html",
      css: sourceFolder + "/scss/**/*.scss",
      js: sourceFolder + "/js/**/*.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: destinationFolder,
  },
  // libsSCSS: ["node_modules/foundation-sites/scss"],
  libsJS: ["node_modules/jquery/dist/jquery.min.js"],

  gulp: require("gulp"),
  browsersync: require("browser-sync").create(),
  del: require("del"),
  plugins: require("gulp-load-plugins")(),
};
$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});
$.gulp.task(
  "build",
  $.gulp.series("clean", $.gulp.parallel("js", "css", "html", "images"))
);
$.gulp.task(
  "default",
  $.gulp.series("build", $.gulp.parallel("watchFiles", "browserSync"))
);
