var gulp = require("gulp");

var del = require('del');
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var minifyHTML = require("gulp-minify-html");
var runSequence = require("run-sequence");

var paths = {
	html: ["./src/index.html", "./src/about.html"],
	js: {
		all: "./src/js/*.js",
		//Pretty files to be minified
		pretty: ["./src/js/app.js", "./src/js/livePerf.js"],
		//Already minifed files to be copied
		min: ["./src/js/jssor.slider.mini.js", "./src/js/picturefill.min.js"]
	},
	scss: {
		all: "./src/scss/*",
		main: "./src/scss/*.scss"
	},
	css: {
		dir: "./src/css",
		all: "./src/css/*.css"
	},
	img: "./src/img/*",
	build: "./build"
};

// JavaScript linting task
gulp.task("jshint", function(){
	return gulp.src(paths.js.all)
	.pipe(jshint())
	.pipe(jshint.reporter("default"));
});

// Compile SASS task
gulp.task("sass", function(){
	return gulp.src(paths.scss.all)
	.pipe(sass())
	.pipe(gulp.dest(paths.css.dir));
});

// Watch task
gulp.task("watch", function(){
	gulp.watch(paths.js.all, ["jshint"]);
	gulp.watch(paths.scss.all, ["sass"]);
});

// Default task
gulp.task("site-dev", ["jshint", "sass", "watch"]);


//Build parts ***


//Delete build
gulp.task('clean', function(){
	return del(paths.build);
});

// Minify index
gulp.task("html", function(){
	return gulp.src(paths.html)
	.pipe(minifyHTML())
	.pipe(gulp.dest(paths.build));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task("js", function(){
	return gulp.src(paths.js.pretty)
	.pipe(uglify())
	.pipe(gulp.dest(paths.build+"/js"));
});

gulp.task("copy", function(){
	return gulp.src(paths.js.min)
	.pipe(gulp.dest(paths.build+"/js"));
});

// Styles build task, concatenates all the files
gulp.task("styles", function() {
	return gulp.src(paths.css.all)
	.pipe(gulp.dest(paths.build+"/css"));
});

// Image optimization task
gulp.task("images", function() {
	return gulp.src(paths.img)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.build+"/img"));
});

// Complete build task

gulp.task("site-build", function(){
	runSequence(
		"clean",
		"sass",
		"html",
		"js",
		"copy",
		"styles",
		"images"
		);
});





