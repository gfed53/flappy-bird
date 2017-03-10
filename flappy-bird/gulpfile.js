var gulp = require("gulp");

var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var pump = require("pump");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

// JavaScript linting task
gulp.task("jshint", function(){
	return gulp.src("js/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});

gulp.task("scripts", function(){
	return browserify("js/main.js")
	.bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("compress", function () {
  pump([
        gulp.src("js/app.js"),
        uglify(),
        gulp.dest("dist")
    ]
  );
});

gulp.task("watch", function(){
	gulp.watch("js/**/*.js", ["jshint", "scripts", "compress"]);
});

gulp.task("default", ["jshint", "scripts", "compress", "watch"]);

gulp.task("build", ["jshint", "scripts"]);

